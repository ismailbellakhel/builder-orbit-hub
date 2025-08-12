import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import ContentExtraction from "./pages/ContentExtraction";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Main navigation routes */}
          <Route path="/features" element={
            <PlaceholderPage
              title="Features"
              description="Discover all the powerful tools and capabilities that make MagCraft the best platform for creating digital magazines."
            />
          } />
          <Route path="/templates" element={
            <PlaceholderPage
              title="Templates"
              description="Browse our collection of professionally designed magazine templates for every industry and style."
            />
          } />
          <Route path="/pricing" element={
            <PlaceholderPage
              title="Pricing"
              description="Choose the perfect plan for your magazine creation needs. Start free and scale as you grow."
            />
          } />
          <Route path="/examples" element={
            <PlaceholderPage
              title="Examples"
              description="Get inspired by amazing digital magazines created by our community of creators."
            />
          } />

          {/* Footer/Resource routes */}
          <Route path="/help" element={
            <PlaceholderPage
              title="Help Center"
              description="Find answers to your questions and learn how to get the most out of MagCraft."
            />
          } />
          <Route path="/tutorials" element={
            <PlaceholderPage
              title="Tutorials"
              description="Step-by-step guides to help you create stunning magazines like a pro."
            />
          } />
          <Route path="/blog" element={
            <PlaceholderPage
              title="Blog"
              description="Tips, insights, and inspiration for digital magazine creators."
            />
          } />
          <Route path="/community" element={
            <PlaceholderPage
              title="Community"
              description="Connect with other creators, share your work, and get feedback."
            />
          } />
          <Route path="/about" element={
            <PlaceholderPage
              title="About Us"
              description="Learn about our mission to democratize magazine creation for everyone."
            />
          } />
          <Route path="/contact" element={
            <PlaceholderPage
              title="Contact"
              description="Get in touch with our team. We'd love to hear from you!"
            />
          } />
          <Route path="/careers" element={
            <PlaceholderPage
              title="Careers"
              description="Join our team and help shape the future of digital publishing."
            />
          } />
          <Route path="/privacy" element={
            <PlaceholderPage
              title="Privacy Policy"
              description="Learn how we protect and handle your personal information."
            />
          } />
          <Route path="/terms" element={
            <PlaceholderPage
              title="Terms of Service"
              description="Our terms and conditions for using the MagCraft platform."
            />
          } />
          <Route path="/cookies" element={
            <PlaceholderPage
              title="Cookie Policy"
              description="Information about how we use cookies to improve your experience."
            />
          } />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
