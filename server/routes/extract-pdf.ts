import { RequestHandler } from "express";
import multer from "multer";

export interface ExtractedContent {
  title: string;
  content: string;
  images: string[];
  metadata?: {
    author?: string;
    publishDate?: string;
    wordCount?: number;
    pages?: number;
  };
}

// Configure multer for file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

export const uploadMiddleware = upload.single('pdf');

export const handleExtractPdf: RequestHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF file uploaded" });
    }

    const buffer = req.file.buffer;
    
    // Parse PDF
    const data = await pdf(buffer);
    
    // Extract content
    let content = data.text;
    
    // Clean up content
    content = content
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();

    // Extract title from filename or first line
    let title = req.file.originalname.replace('.pdf', '').replace(/[_-]/g, ' ');
    
    // Try to get a better title from the first line if it looks like a title
    const lines = content.split('\n');
    if (lines.length > 0) {
      const firstLine = lines[0].trim();
      if (firstLine.length > 10 && firstLine.length < 100 && !firstLine.includes('.')) {
        title = firstLine;
      }
    }

    // Extract metadata
    const metadata: ExtractedContent['metadata'] = {
      wordCount: content.split(/\s+/).length,
      pages: data.numpages
    };

    // Try to extract author from PDF metadata
    if (data.info && data.info.Author) {
      metadata.author = data.info.Author;
    }

    // Try to extract creation date
    if (data.info && data.info.CreationDate) {
      try {
        const date = new Date(data.info.CreationDate);
        if (!isNaN(date.getTime())) {
          metadata.publishDate = date.toLocaleDateString();
        }
      } catch {
        // Skip invalid dates
      }
    }

    const extractedContent: ExtractedContent = {
      title,
      content,
      images: [], // PDF image extraction would require additional libraries
      metadata
    };

    res.json(extractedContent);

  } catch (error) {
    console.error("PDF extraction error:", error);
    
    if (error instanceof Error) {
      if (error.message.includes('Only PDF files are allowed')) {
        return res.status(400).json({ error: "Please upload a valid PDF file" });
      }
      if (error.message.includes('Invalid PDF')) {
        return res.status(400).json({ error: "The uploaded file is not a valid PDF" });
      }
    }

    res.status(500).json({ error: "Failed to extract content from PDF" });
  }
};
