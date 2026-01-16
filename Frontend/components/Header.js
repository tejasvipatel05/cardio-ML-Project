import Link from 'next/link';
import { useRouter } from 'next/router';
import { Heart, Activity, BookOpen, BarChart3, Stethoscope, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => router.pathname === path;

  const navLinks = [
    { href: '/how-it-works', label: 'How it Works', icon: BookOpen },
    { href: '/health-insights', label: 'Health Insights', icon: Stethoscope },
    { href: '/model', label: 'Model', icon: BarChart3 },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Close menu when route changes
  useEffect(() => {
    closeMobileMenu();
  }, [router.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-card border-b border-border shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-background/95"
      >
        <nav className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Heart className="w-6 sm:w-7 h-6 sm:h-7 text-destructive fill-destructive" />
              </motion.div>
              <span className="text-lg sm:text-2xl font-bold gradient-text">
                CardioML
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link 
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center space-x-2 transition-colors relative group",
                      active 
                        ? "text-primary font-semibold" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                    {active && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right side - Theme toggle and buttons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />
              
              {/* Desktop Assess Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
                <Link href="/assessment" className="btn-primary flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span className="hidden sm:inline">Assess Your Risk</span>
                </Link>
              </motion.div>

              {/* Mobile Menu Toggle Button - Always Visible */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 hover:bg-muted rounded-lg transition-all duration-200 relative z-40"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                <motion.div
                  animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-6 h-6"
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6" strokeWidth={2.5} />
                  ) : (
                    <Menu className="w-6 h-6" strokeWidth={2.5} />
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-black/50 md:hidden z-30"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation Menu - Sliding Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-screen w-full max-w-sm bg-card border-l border-border shadow-xl md:hidden z-40 flex flex-col overflow-y-auto"
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-border sticky top-0 bg-card">
              <span className="text-lg font-bold gradient-text">Menu</span>
              <button
                onClick={closeMobileMenu}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex-1 px-4 py-6">
              <nav className="space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMobileMenu}
                        className={cn(
                          "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                          active
                            ? "bg-primary text-primary-foreground font-semibold shadow-md"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span className="text-base">{link.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Divider */}
              <div className="my-6 h-px bg-border" />

              {/* Mobile Assess Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/assessment"
                  onClick={closeMobileMenu}
                  className="btn-primary flex items-center justify-center space-x-2 w-full py-3 text-base font-semibold"
                >
                  <Activity className="w-5 h-5" />
                  <span>Assess Your Risk</span>
                </Link>
              </motion.div>
            </div>

            {/* Menu Footer - Theme Toggle */}
            <div className="px-6 py-4 border-t border-border bg-card sticky bottom-0 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}