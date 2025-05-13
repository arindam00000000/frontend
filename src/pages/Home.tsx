import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGeneratorForm from "@/components/ProductGeneratorForm";
import TestimonialCard from "@/components/ui/testimonial-card";
import FeatureCard from "@/components/ui/feature-card";
import PricingCard from "@/components/ui/pricing-card";
import { Button } from "@/components/ui/button";
import ProductModal from "@/components/modals/ProductModal";
import SignupModal from "@/components/modals/SignupModal";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

const exampleProducts = [
  {
    name: "Instagram Growth Masterclass",
    niche: "Social Media",
    price: "$97",
    followers: "15k"
  },
  {
    name: "Fitness Meal Plan Bundle",
    niche: "Health & Fitness",
    price: "$49",
    followers: "50k"
  },
  {
    name: "Content Creator Toolkit",
    niche: "Digital Marketing",
    price: "$129",
    followers: "25k"
  },
  {
    name: "YouTube SEO Guide",
    niche: "Video Creation",
    price: "$79",
    followers: "100k"
  },
  {
    name: "Personal Finance Spreadsheet",
    niche: "Finance",
    price: "$39",
    followers: "30k"
  }
];

const Home = () => {
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [generatedProduct, setGeneratedProduct] = useState<any>(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  
  // Auto-rotate example products every 45 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentProductIndex((prevIndex) => 
        prevIndex === exampleProducts.length - 1 ? 0 : prevIndex + 1
      );
    }, 45000);
    
    return () => clearInterval(intervalId);
  }, []);

  const handleProductGenerated = (data: any) => {
    setGeneratedProduct(data);
    setProductModalOpen(true);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Live Product Examples */}
      <div className="bg-primary/10 py-3 overflow-hidden relative">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="flex items-center text-primary">
            <i className="fas fa-bolt-lightning mr-2"></i>
            <span className="font-medium mr-3">Recently Generated:</span>
            <motion.div
              key={currentProductIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <span className="font-semibold">{exampleProducts[currentProductIndex].name}</span>
              <span className="mx-2 text-gray-500">•</span>
              <span>{exampleProducts[currentProductIndex].niche}</span>
              <span className="mx-2 text-gray-500">•</span>
              <span className="text-green-600 font-semibold">{exampleProducts[currentProductIndex].price}</span>
              <span className="mx-2 text-gray-500">•</span>
              <span>{exampleProducts[currentProductIndex].followers} followers</span>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="py-12 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div 
              className="w-full lg:w-1/2 mb-10 lg:mb-0"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <span className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">For Content Creators</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                What Should You Sell? <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">Let AI Tell You in 30 Seconds.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Turn your audience into revenue with AI-powered product recommendations tailored specifically for your niche and followers.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="#try-it" className="bg-primary text-white text-lg font-medium px-8 py-4 rounded-xl shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center">
                  <span>Generate My Product Now</span>
                  <i className="fas fa-angle-right ml-2"></i>
                </a>
              </div>
              <div className="mt-6 text-gray-600 flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                <span>Trusted by 100,000+ content creators worldwide</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full lg:w-1/2 flex justify-center lg:justify-end"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="relative">
                {/* A content creator looking at products on mobile device */}
                <img src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80" alt="Content creator using AutoProduct AI" className="rounded-2xl shadow-2xl max-w-full h-auto" />
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg px-4 py-3 max-w-xs"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                >
                  <div className="flex items-center text-green-500 mb-1">
                    <i className="fas fa-check-circle mr-2"></i>
                    <span className="font-medium">Product Generated!</span>
                  </div>
                  <p className="text-sm text-gray-600">E-book: "Master TikTok Growth" - $27</p>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg px-4 py-3 max-w-xs"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                >
                  <div className="flex items-center text-gray-800 mb-1">
                    <i className="fas fa-bolt text-amber-500 mr-2"></i>
                    <span className="font-medium">AI-Powered Insights</span>
                  </div>
                  <p className="text-sm text-gray-600">Precise product recommendations based on your audience</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Trusted By Section */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-gray-600">Trusted by content creators from:</p>
          </div>
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="text-gray-400 text-2xl"><i className="fab fa-tiktok mr-2"></i>TikTok</div>
            <div className="text-gray-400 text-2xl"><i className="fab fa-youtube mr-2"></i>YouTube</div>
            <div className="text-gray-400 text-2xl"><i className="fab fa-instagram mr-2"></i>Instagram</div>
            <div className="text-gray-400 text-2xl"><i className="fab fa-twitter mr-2"></i>Twitter</div>
            <div className="text-gray-400 text-2xl"><i className="fab fa-twitch mr-2"></i>Twitch</div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-white scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">Key Features</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">How AutoProduct AI Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Turn your social media stats into profitable product ideas in just 3 simple steps.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <FeatureCard
              icon={<i className="fas fa-user-edit text-2xl"></i>}
              title="Enter Your Details"
              description="Tell us about your niche, followers count, and typical engagement. The more information you provide, the better our AI can generate tailored product ideas."
              colorClass="bg-primary/10"
              exampleContent={
                <div>
                  <div className="flex items-center mb-3">
                    <div className="w-2/5 text-sm text-gray-500">Niche:</div>
                    <div className="w-3/5 text-sm font-medium">Fitness & Nutrition</div>
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="w-2/5 text-sm text-gray-500">Followers:</div>
                    <div className="w-3/5 text-sm font-medium">25,000</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2/5 text-sm text-gray-500">Avg. Views:</div>
                    <div className="w-3/5 text-sm font-medium">5,000</div>
                  </div>
                </div>
              }
            />
            
            <FeatureCard
              icon={<i className="fas fa-robot text-2xl"></i>}
              title="Get AI-Generated Product Ideas"
              description="Our advanced AI analyzes your input and generates product concepts specifically designed to resonate with your audience."
              colorClass="bg-secondary/10"
              delay={200}
              exampleContent={
                <div>
                  <div className="flex items-center mb-3">
                    <div className="w-1/4 text-sm text-gray-500">Product:</div>
                    <div className="w-3/4 text-sm font-medium">30-Day Meal Plan Package</div>
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="w-1/4 text-sm text-gray-500">Type:</div>
                    <div className="w-3/4 text-sm font-medium">Digital Download</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/4 text-sm text-gray-500">Price:</div>
                    <div className="w-3/4 text-sm font-medium text-green-600">$37</div>
                  </div>
                </div>
              }
            />
            
            <FeatureCard
              icon={<i className="fas fa-chart-line text-2xl"></i>}
              title="Detailed Marketing Strategy"
              description="Receive a complete monetization plan including pricing, description, and a sales funnel strategy to maximize conversions."
              colorClass="bg-green-100"
              delay={400}
              exampleContent={
                <div>
                  <div className="text-sm font-medium mb-2">Marketing Strategy:</div>
                  <ul className="text-sm text-gray-600 space-y-1 pl-5 list-disc">
                    <li>Teaser content for Stories</li>
                    <li>Email sequence template</li>
                    <li>3-part launch framework</li>
                    <li>Upsell recommendation</li>
                  </ul>
                </div>
              }
            />
          </div>
        </div>
      </section>
      
      {/* Try It Now Section */}
      <section id="try-it" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">Get Started</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Generate Your Product Idea Now</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                No credit card required to try. Start free and see the power of AI-generated product ideas.
              </p>
            </motion.div>
            
            {/* Product Generator Form */}
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-6 md:p-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ProductGeneratorForm onSuccess={handleProductGenerated} />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Social Proof Section */}
      <section id="testimonials" className="py-16 md:py-24 bg-white scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">Success Stories</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">From Creators Like You</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how content creators have turned their audiences into profitable businesses with AutoProduct AI.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              rating={5}
              content="I was struggling to monetize my TikTok following until I found AutoProduct AI. The tool suggested a fitness meal planner that my audience loved! Made $3,700 in my first month."
              author={{
                name: "Sarah J.",
                title: "Fitness Creator, 87K followers",
                avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
              }}
            />
            
            <TestimonialCard 
              rating={5}
              content="I was posting productivity tips on YouTube for 2 years with no monetization strategy. AutoProduct AI suggested a template bundle that my audience absolutely needed. Now making $2,500/month passively."
              author={{
                name: "Mark T.",
                title: "Productivity YouTuber, 42K subs",
                avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
              }}
              delay={200}
            />
            
            <TestimonialCard 
              rating={4.5}
              content="As a beauty influencer, I was lost on what to sell besides promoting other brands. AutoProduct AI suggested a skincare routine guide which I turned into an ebook. It's now my main income source!"
              author={{
                name: "Aisha K.",
                title: "Beauty Creator, 120K followers",
                avatarUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
              }}
              delay={400}
            />
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-gray-50 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">Pricing Plans</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Choose Your Plan</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start for free and upgrade as your business grows.
            </p>
          </motion.div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <PricingCard
                title="Free Plan"
                price="$0"
                description="Perfect for beginners"
                features={[
                  { text: "1 product idea generation", included: true },
                  { text: "Basic product description", included: true },
                  { text: "Suggested pricing range", included: true },
                  { text: "Save product ideas", included: false },
                  { text: "Detailed marketing plan", included: false },
                  { text: "Remove AutoProduct AI branding", included: false },
                ]}
                action={{
                  text: "Try For Free",
                  href: "#try-it"
                }}
              />
              
              <PricingCard
                title="Pro Plan"
                price="$49"
                description={<div><span className="line-through text-gray-400">$129</span> <span className="text-sm text-green-500 font-medium">60% OFF</span></div>}
                features={[
                  { text: "Unlimited product ideas", included: true },
                  { text: "Comprehensive product descriptions", included: true },
                  { text: "Optimized pricing strategy", included: true },
                  { text: "Save & organize all product ideas", included: true },
                  { text: "Complete marketing & sales funnel plan", included: true },
                  { text: "White-labeled results (no branding)", included: true },
                ]}
                action={{
                  text: "Start 30-Day Free Trial",
                  href: "#",
                  onClick: () => setSignupModalOpen(true)
                }}
                isPrimary={true}
                popularBadge={true}
                footerText="30-day free trial, then $49/month. Cancel anytime."
                delay={200}
              />
            </div>
            
            {/* Pricing FAQ */}
            <motion.div 
              className="bg-white rounded-xl p-6 mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">What happens after the 30-day trial?</h4>
                  <p className="text-gray-600">After your 30-day free trial, your account will automatically be billed $49/month unless you cancel. You can cancel anytime during the trial period with no charge.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Do I need a credit card to try the free plan?</h4>
                  <p className="text-gray-600">No, you can use the free plan with just email signup. No credit card required for the free tier.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Can I upgrade from Free to Pro later?</h4>
                  <p className="text-gray-600">Yes, you can upgrade to the Pro plan at any time to unlock all features and benefits.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Monetize Your Audience?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of content creators who have discovered their perfect digital product with AutoProduct AI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="#try-it" className="bg-white text-primary font-medium px-8 py-4 rounded-xl shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg text-center">
                Try For Free
              </Link>
              <Link href="#pricing" className="bg-transparent text-white font-medium px-8 py-4 rounded-xl border-2 border-white hover:bg-white/10 transition-all duration-300 text-center">
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modals */}
      <ProductModal 
        isOpen={productModalOpen} 
        onClose={() => setProductModalOpen(false)} 
        productData={generatedProduct}
      />
      
      <SignupModal 
        isOpen={signupModalOpen} 
        onClose={() => setSignupModalOpen(false)} 
      />
      
      <Footer />
    </div>
  );
};

export default Home;
