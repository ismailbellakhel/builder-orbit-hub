import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BookOpen, ArrowLeft, MessageCircle } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  comingSoon?: boolean;
}

export default function PlaceholderPage({ title, description, comingSoon = true }: PlaceholderPageProps) {
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
            <Link to="/features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</Link>
            <Link to="/templates" className="text-gray-600 hover:text-purple-600 transition-colors">Templates</Link>
            <Link to="/pricing" className="text-gray-600 hover:text-purple-600 transition-colors">Pricing</Link>
            <Button variant="outline" size="sm">Sign In</Button>
            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              Start Creating
            </Button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardHeader className="pb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl mb-4">{title}</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                {description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              {comingSoon && (
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-purple-900 mb-2">Coming Soon!</h3>
                  <p className="text-purple-700 text-sm">
                    This feature is currently in development. Continue prompting to help us build out this page with the specific content and functionality you need.
                  </p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
                <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Request This Feature
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>Need this page built out? Just continue the conversation and describe what you'd like to see here!</p>
          </div>
        </div>
      </main>
    </div>
  );
}
