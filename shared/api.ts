/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Content extraction types
 */
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
    pages?: number;
  };
}

/**
 * RSS feed extraction types
 */
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
