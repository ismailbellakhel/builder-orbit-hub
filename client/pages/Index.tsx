import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Sparkles, 
  Palette, 
  Share2, 
  Play, 
  Star, 
  Users, 
  Zap,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/20 to-indigo-50/30">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              MagCraft
            </span>
          </div>
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-200">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Magazine Creation
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent leading-tight">
            Create Stunning
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Digital Magazines
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your content into beautiful, interactive digital magazines with our intuitive drag-and-drop editor. 
            No design experience required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-lg px-8 py-6">
              <Play className="w-5 h-5 mr-2" />
              Start Creating Free
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <BookOpen className="w-5 h-5 mr-2" />
              View Examples
            </Button>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              50K+ magazines created
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 text-blue-500 mr-1" />
              10K+ creators
            </div>
            <div className="flex items-center">
              <Zap className="w-4 h-4 text-green-500 mr-1" />
              99.9% uptime
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to create
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> amazing magazines</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Powerful tools and beautiful templates to bring your vision to life
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Drag & Drop Editor</CardTitle>
              <CardDescription>
                Intuitive visual editor with real-time preview. Create stunning layouts without any design experience.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Premium Templates</CardTitle>
              <CardDescription>
                200+ professionally designed templates for every industry and style. Start with a template or build from scratch.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Instant Publishing</CardTitle>
              <CardDescription>
                Publish and share your magazines instantly. Generate shareable links, embed codes, or export as PDF.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <CardTitle>AI-Powered Content</CardTitle>
              <CardDescription>
                Generate content suggestions, optimize layouts, and enhance images with our built-in AI tools.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Team Collaboration</CardTitle>
              <CardDescription>
                Work together with your team. Real-time editing, comments, and approval workflows included.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-yellow-500 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Analytics & Insights</CardTitle>
              <CardDescription>
                Track reader engagement, view statistics, and optimize your content with detailed analytics.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-indigo-600/90"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to create your first magazine?
            </h2>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto text-lg">
              Join thousands of creators who have already published amazing digital magazines. Start for free today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8 py-6">
                <Play className="w-5 h-5 mr-2" />
                Start Creating Now
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                View Pricing
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-purple-100">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Free to start
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-gray-200">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-900">MagCraft</span>
            </div>
            <p className="text-gray-600 text-sm">
              The easiest way to create stunning digital magazines. Loved by creators worldwide.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/features" className="hover:text-purple-600 transition-colors">Features</Link></li>
              <li><Link to="/templates" className="hover:text-purple-600 transition-colors">Templates</Link></li>
              <li><Link to="/pricing" className="hover:text-purple-600 transition-colors">Pricing</Link></li>
              <li><Link to="/examples" className="hover:text-purple-600 transition-colors">Examples</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/help" className="hover:text-purple-600 transition-colors">Help Center</Link></li>
              <li><Link to="/tutorials" className="hover:text-purple-600 transition-colors">Tutorials</Link></li>
              <li><Link to="/blog" className="hover:text-purple-600 transition-colors">Blog</Link></li>
              <li><Link to="/community" className="hover:text-purple-600 transition-colors">Community</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/about" className="hover:text-purple-600 transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-purple-600 transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-purple-600 transition-colors">Careers</Link></li>
              <li><Link to="/privacy" className="hover:text-purple-600 transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © 2024 MagCraft. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">Terms</Link>
            <Link to="/privacy" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">Privacy</Link>
            <Link to="/cookies" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
