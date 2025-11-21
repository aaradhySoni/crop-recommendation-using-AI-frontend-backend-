import { Button } from "@/components/ui/button";
import { Menu, X, Sprout } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover-scale">
            <div className="p-2 bg-gradient-hero rounded-xl">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="font-outfit text-xl font-bold">CropSmart AI</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/recommend" className="text-foreground hover:text-primary transition-colors">
              Get Recommendation
            </Link>
            <Button variant="hero" size="default" onClick={() => navigate("/recommend")}>
              Start Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 animate-slide-in">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="px-4 py-2 hover:bg-muted rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link 
                to="/recommend" 
                className="px-4 py-2 hover:bg-muted rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                Get Recommendation
              </Link>
              <Button 
                variant="hero" 
                size="default" 
                onClick={() => {
                  navigate("/recommend");
                  toggleMenu();
                }}
              >
                Start Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
