import Link from 'next/link';
import { useRouter } from 'next/router';
import { Heart, Activity, BookOpen, BarChart3, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const router = useRouter();

  const isActive = (path) => router.pathname === path;

  const navLinks = [
    { href: '/how-it-works', label: 'How it Works', icon: BookOpen },
    { href: '/health-insights', label: 'Health Insights', icon: Stethoscope },
    { href: '/model', label: 'Model', icon: BarChart3 },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-card border-b border-border shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-background/95"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Heart className="w-7 h-7 text-destructive fill-destructive" />
            </motion.div>
            <span className="text-2xl font-bold gradient-text">
              CardioML
            </span>
          </Link>
          
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

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/assessment" className="btn-primary flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span className="hidden sm:inline">Assess Your Risk</span>
                <span className="sm:hidden">Assess</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}