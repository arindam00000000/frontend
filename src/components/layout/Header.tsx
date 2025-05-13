import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import logoImage from "@/assets/logo.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isLoading, signOut } = useAuth();
  const [location] = useLocation();
  
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Create smooth scroll function for navigation links
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img src={logoImage} alt="AutoProduct AI Logo" className="h-10 w-auto mr-3" />
              <span className="font-bold text-gray-900 text-xl">AutoProduct AI</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#features" 
              onClick={(e) => scrollToSection(e, 'features')}
              className="text-gray-700 hover:text-primary font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:bg-primary after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
            >
              Features
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => scrollToSection(e, 'pricing')}
              className="text-gray-700 hover:text-primary font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:bg-primary after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
            >
              Pricing
            </a>
            <a 
              href="#testimonials" 
              onClick={(e) => scrollToSection(e, 'testimonials')}
              className="text-gray-700 hover:text-primary font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:bg-primary after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
            >
              Testimonials
            </a>
            
            {isLoading ? (
              <Button variant="ghost" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </Button>
            ) : user ? (
              <>
                <Link href="/dashboard" className="text-gray-800 font-medium hover:text-primary transition">
                  Dashboard
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => signOut()}
                  className="font-medium"
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-800 font-medium hover:text-primary transition">
                  Log in
                </Link>
                <Link href="/signup" className="bg-gradient-to-r from-primary to-purple-600 text-white font-medium px-5 py-2.5 rounded-lg hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5">
                  Sign up
                </Link>
              </>
            )}
          </div>
          
          <button 
            type="button" 
            className="md:hidden text-gray-600"
            onClick={toggleMobileMenu}
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden bg-white pb-4 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col space-y-3">
            <Link href="/#features" className="text-gray-600 hover:text-primary transition px-4 py-2">
              Features
            </Link>
            <Link href="/#pricing" className="text-gray-600 hover:text-primary transition px-4 py-2">
              Pricing
            </Link>
            <Link href="/#testimonials" className="text-gray-600 hover:text-primary transition px-4 py-2">
              Testimonials
            </Link>
            
            {isLoading ? (
              <Button variant="ghost" disabled className="mx-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </Button>
            ) : user ? (
              <>
                <Link href="/dashboard" className="text-gray-800 font-medium hover:text-primary transition px-4 py-2">
                  Dashboard
                </Link>
                <Button 
                  variant="outline"
                  onClick={() => signOut()}
                  className="font-medium mx-4"
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-800 font-medium hover:text-primary transition px-4 py-2">
                  Log in
                </Link>
                <Link href="/signup" className="bg-primary text-white font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition mx-4">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
