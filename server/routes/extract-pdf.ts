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

    // For now, we'll provide a placeholder response until we can properly implement PDF parsing
    // This keeps the API working while we work on a better PDF solution

    const title = req.file.originalname.replace('.pdf', '').replace(/[_-]/g, ' ');

    const extractedContent: ExtractedContent = {
      title,
      content: "PDF content extraction is currently being developed. Your PDF has been received and we're working on implementing full text extraction. Please try the URL extraction feature for web content, or check back soon for PDF support.",
      images: [],
      metadata: {
        wordCount: 0,
        pages: 1
      }
    };

    res.json(extractedContent);

  } catch (error) {
    console.error("PDF extraction error:", error);

    if (error instanceof Error) {
      if (error.message.includes('Only PDF files are allowed')) {
        return res.status(400).json({ error: "Please upload a valid PDF file" });
      }
    }

    res.status(500).json({ error: "Failed to process PDF file" });
  }
};
