import { RequestHandler } from "express";
import axios from "axios";
import * as cheerio from "cheerio";

export interface ExtractUrlRequest {
  url: string;
}

export interface ExtractedContent {
  title: string;
  content: string;
  images: string[];
  metadata?: {
    author?: string;
    publishDate?: string;
    wordCount?: number;
  };
}

export const handleExtractUrl: RequestHandler = async (req, res) => {
  try {
    const { url } = req.body as ExtractUrlRequest;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    // Fetch the webpage
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Extract title
    let title = $("title").text().trim();
    if (!title) {
      title = $("h1").first().text().trim();
    }
    if (!title) {
      title = "Untitled";
    }

    // Extract main content
    let content = "";

    // Try to find article content in common selectors
    const contentSelectors = [
      "article",
      '[role="main"]',
      ".content",
      ".post-content",
      ".entry-content",
      ".article-content",
      "main",
      ".main-content",
    ];

    for (const selector of contentSelectors) {
      const element = $(selector);
      if (element.length > 0) {
        content = element.text().trim();
        break;
      }
    }

    // If no main content found, extract from paragraphs
    if (!content) {
      content = $("p")
        .map((_, el) => $(el).text().trim())
        .get()
        .join("\n\n");
    }

    // Clean up content
    content = content
      .replace(/\s+/g, " ")
      .replace(/\n\s*\n/g, "\n\n")
      .trim();

    // Extract images
    const images: string[] = [];
    $("img").each((_, el) => {
      const src = $(el).attr("src");
      if (src) {
        // Convert relative URLs to absolute
        try {
          const imageUrl = new URL(src, url).href;
          // Filter out very small images (likely icons/decorative)
          const width = $(el).attr("width");
          const height = $(el).attr("height");

          if (
            !width ||
            !height ||
            (parseInt(width) > 100 && parseInt(height) > 100)
          ) {
            images.push(imageUrl);
          }
        } catch {
          // Skip invalid URLs
        }
      }
    });

    // Extract metadata
    const metadata: ExtractedContent["metadata"] = {
      wordCount: content.split(/\s+/).length,
    };

    // Try to extract author
    const authorSelectors = [
      '[name="author"]',
      '[property="article:author"]',
      ".author",
      ".byline",
      '[rel="author"]',
    ];

    for (const selector of authorSelectors) {
      const authorElement = $(selector);
      if (authorElement.length > 0) {
        metadata.author =
          authorElement.attr("content") || authorElement.text().trim();
        break;
      }
    }

    // Try to extract publish date
    const dateSelectors = [
      '[property="article:published_time"]',
      '[name="publish_date"]',
      "time[datetime]",
      ".publish-date",
      ".date",
    ];

    for (const selector of dateSelectors) {
      const dateElement = $(selector);
      if (dateElement.length > 0) {
        const dateValue =
          dateElement.attr("content") ||
          dateElement.attr("datetime") ||
          dateElement.text().trim();

        if (dateValue) {
          try {
            const date = new Date(dateValue);
            if (!isNaN(date.getTime())) {
              metadata.publishDate = date.toLocaleDateString();
              break;
            }
          } catch {
            // Skip invalid dates
          }
        }
      }
    }

    const extractedContent: ExtractedContent = {
      title,
      content,
      images: images.slice(0, 20), // Limit to 20 images
      metadata,
    };

    res.json(extractedContent);
  } catch (error) {
    console.error("URL extraction error:", error);

    if (axios.isAxiosError(error)) {
      if (error.code === "ENOTFOUND") {
        return res
          .status(400)
          .json({ error: "Website not found or unreachable" });
      }
      if (error.response?.status === 403) {
        return res.status(403).json({ error: "Access denied by the website" });
      }
      if (error.response?.status === 404) {
        return res.status(404).json({ error: "Page not found" });
      }
    }

    res.status(500).json({ error: "Failed to extract content from URL" });
  }
};
