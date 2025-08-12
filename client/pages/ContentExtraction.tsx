import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Link as LinkIcon,
  FileText,
  Download,
  Upload,
  ArrowLeft,
  Loader2,
  CheckCircle,
  AlertCircle,
  Copy,
  Image,
  Type,
  Zap,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ExtractedContent {
  title: string;
  content: string;
  images: string[];
  metadata?: {
    author?: string;
    publishDate?: string;
    wordCount?: number;
  };
}

export default function ContentExtraction() {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedContent, setExtractedContent] =
    useState<ExtractedContent | null>(null);
  const [error, setError] = useState<string>("");

  const handleUrlExtraction = async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    setIsExtracting(true);
    setError("");

    try {
      const response = await fetch("/api/extract-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to extract content");
      }

      setExtractedContent(data);
      toast({
        title: "Content extracted successfully!",
        description: "Your content is ready to use in your magazine.",
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to extract content",
      );
      toast({
        variant: "destructive",
        title: "Extraction failed",
        description: "Could not extract content from the provided URL.",
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const handlePdfExtraction = async () => {
    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    setIsExtracting(true);
    setError("");

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await fetch("/api/extract-pdf", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to extract PDF content");
      }

      setExtractedContent(data);
      toast({
        title: "PDF content extracted!",
        description: "Your PDF content is ready to use in your magazine.",
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to extract PDF content",
      );
      toast({
        variant: "destructive",
        title: "PDF extraction failed",
        description: "Could not extract content from the PDF file.",
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const copyContent = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard!",
      description: "Content has been copied to your clipboard.",
    });
  };

  const resetExtraction = () => {
    setExtractedContent(null);
    setError("");
    setUrl("");
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/20 to-indigo-50/30">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              MagCraft
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/features"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Features
            </Link>
            <Link
              to="/templates"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Templates
            </Link>
            <Link
              to="/pricing"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Pricing
            </Link>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              Start Creating
            </Button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold mb-2">Content Extraction</h1>
              <p className="text-gray-600">
                Extract content from web pages and PDF documents to use in your
                magazines
              </p>
            </div>
          </div>

          {!extractedContent ? (
            /* Extraction Interface */
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  Import Content
                </CardTitle>
                <CardDescription>
                  Extract text, images, and metadata from web pages or PDF
                  documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="url" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger
                      value="url"
                      className="flex items-center gap-2"
                    >
                      <LinkIcon className="w-4 h-4" />
                      Web Page
                    </TabsTrigger>
                    <TabsTrigger
                      value="pdf"
                      className="flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      PDF Document
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="url" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="url">Website URL</Label>
                      <Input
                        id="url"
                        type="url"
                        placeholder="https://example.com/article"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        disabled={isExtracting}
                      />
                      <p className="text-sm text-gray-500">
                        Enter the URL of a web page to extract its content
                      </p>
                    </div>
                    <Button
                      onClick={handleUrlExtraction}
                      disabled={isExtracting || !url.trim()}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    >
                      {isExtracting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Extracting Content...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Extract from URL
                        </>
                      )}
                    </Button>
                  </TabsContent>

                  <TabsContent value="pdf" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pdf">PDF Document</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                        <input
                          id="pdf"
                          type="file"
                          accept=".pdf"
                          onChange={(e) => setFile(e.target.files?.[0] || null)}
                          className="hidden"
                          disabled={isExtracting}
                        />
                        <label htmlFor="pdf" className="cursor-pointer">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600 mb-1">
                            {file
                              ? file.name
                              : "Click to upload PDF or drag and drop"}
                          </p>
                          <p className="text-sm text-gray-500">
                            PDF files up to 10MB
                          </p>
                        </label>
                      </div>
                    </div>
                    <Button
                      onClick={handlePdfExtraction}
                      disabled={isExtracting || !file}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    >
                      {isExtracting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Extracting PDF...
                        </>
                      ) : (
                        <>
                          <FileText className="w-4 h-4 mr-2" />
                          Extract from PDF
                        </>
                      )}
                    </Button>
                  </TabsContent>
                </Tabs>

                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-red-700">{error}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            /* Extracted Content Display */
            <div className="space-y-6">
              {/* Success Banner */}
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">
                      Content extracted successfully!
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetExtraction}
                      className="ml-auto"
                    >
                      Extract Another
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Content Preview */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Type className="w-5 h-5" />
                          Extracted Text
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyContent(extractedContent.content)}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-2">
                            {extractedContent.title}
                          </h3>
                          <Textarea
                            value={extractedContent.content}
                            readOnly
                            className="min-h-[300px] resize-none"
                          />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">
                            {extractedContent.content.split(" ").length} words
                          </Badge>
                          {extractedContent.metadata?.author && (
                            <Badge variant="outline">
                              By {extractedContent.metadata.author}
                            </Badge>
                          )}
                          {extractedContent.metadata?.publishDate && (
                            <Badge variant="outline">
                              {extractedContent.metadata.publishDate}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Images */}
                  {extractedContent.images.length > 0 && (
                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Image className="w-5 h-5" />
                          Extracted Images ({extractedContent.images.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2">
                          {extractedContent.images
                            .slice(0, 6)
                            .map((img, index) => (
                              <div
                                key={index}
                                className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
                              >
                                <img
                                  src={img}
                                  alt={`Extracted image ${index + 1}`}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                            ))}
                        </div>
                        {extractedContent.images.length > 6 && (
                          <p className="text-sm text-gray-500 mt-2 text-center">
                            +{extractedContent.images.length - 6} more images
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {/* Actions */}
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
                    <CardHeader>
                      <CardTitle>Next Steps</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                        Use in Magazine
                      </Button>
                      <Button variant="outline" className="w-full">
                        Save as Draft
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() =>
                          copyContent(JSON.stringify(extractedContent, null, 2))
                        }
                      >
                        Export as JSON
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
