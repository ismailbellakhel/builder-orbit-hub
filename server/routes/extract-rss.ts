import { RequestHandler } from "express";
import Parser from "rss-parser";

export interface ExtractRssRequest {
  url: string;
  maxItems?: number;
}

export interface RssArticle {
  title: string;
  content: string;
  link: string;
  pubDate?: string;
  author?: string;
  categories?: string[];
  description?: string;
}

export interface RssExtractedContent {
  feedTitle: string;
  feedDescription?: string;
  feedLink?: string;
  articles: RssArticle[];
  totalItems: number;
}

export const handleExtractRss: RequestHandler = async (req, res) => {
  try {
    const { url, maxItems = 10 } = req.body as ExtractRssRequest;

    if (!url) {
      return res.status(400).json({ error: "RSS feed URL is required" });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ error: "Invalid RSS feed URL format" });
    }

    const parser = new Parser({
      timeout: 10000,
      headers: {
        "User-Agent": "MagCraft RSS Reader 1.0",
      },
    });

    // Parse the RSS feed
    const feed = await parser.parseURL(url);

    // Process feed items
    const articles: RssArticle[] = feed.items
      .slice(0, Math.min(maxItems, 50)) // Limit to max 50 items
      .map((item) => {
        // Extract content (try different content fields)
        let content =
          item.content ||
          item["content:encoded"] ||
          item.description ||
          item.summary ||
          "";

        // Clean HTML tags from content if present
        content = content.replace(/<[^>]*>/g, "").trim();

        // Extract categories
        const categories = item.categories || [];

        return {
          title: item.title || "Untitled",
          content,
          link: item.link || "",
          pubDate: item.pubDate
            ? new Date(item.pubDate).toLocaleDateString()
            : undefined,
          author: item.creator || item.author || undefined,
          categories: Array.isArray(categories) ? categories : [],
          description:
            item.description?.replace(/<[^>]*>/g, "").trim() || undefined,
        };
      });

    const extractedContent: RssExtractedContent = {
      feedTitle: feed.title || "RSS Feed",
      feedDescription: feed.description?.replace(/<[^>]*>/g, "").trim(),
      feedLink: feed.link,
      articles,
      totalItems: feed.items.length,
    };

    res.json(extractedContent);
  } catch (error) {
    console.error("RSS extraction error:", error);

    if (error instanceof Error) {
      if (error.message.includes("Invalid RSS")) {
        return res.status(400).json({ error: "Invalid RSS feed format" });
      }
      if (error.message.includes("timeout")) {
        return res.status(408).json({ error: "RSS feed request timed out" });
      }
      if (error.message.includes("ENOTFOUND")) {
        return res.status(404).json({ error: "RSS feed not found" });
      }
    }

    res.status(500).json({ error: "Failed to parse RSS feed" });
  }
};
