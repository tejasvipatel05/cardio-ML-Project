import Link from 'next/link';
import { Heart, Activity, BookOpen, Stethoscope, BarChart3, FileText, HelpCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const footerLinks = {
    Product: [
      { href: '/assessment', label: 'Features', icon: Activity },
      { href: '/model', label: 'API', icon: BarChart3 },
      { href: '#', label: 'Pricing' },
    ],
    Company: [
      { href: '#', label: 'About Us' },
      { href: '/model', label: 'Research', icon: BookOpen },
      { href: '#', label: 'Privacy' },
    ],
    Support: [
      { href: '/how-it-works', label: 'Docs', icon: FileText },
      { href: '#', label: 'Help Center', icon: HelpCircle },
      { href: '#', label: 'Status', icon: AlertCircle },
    ],
  };

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
          {/* Left Side - Logo and Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <Heart className="w-5 sm:w-6 h-5 sm:h-6 text-destructive fill-destructive mr-2" />
              <span className="text-lg sm:text-2xl font-bold gradient-text">CardioML</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              Advanced cardiovascular predictive modeling for modern healthcare providers and proactive individuals.
            </p>
            <p className="text-xs text-muted-foreground">
              © 2024 CARDIOMML TECHNOLOGIES INC.
            </p>
          </div>

          {/* Right Side - Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h4 className="text-foreground font-semibold mb-3 sm:mb-4 uppercase text-xs sm:text-sm">{category}</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                {links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.label}>
                      <Link 
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-2"
                      >
                        {Icon && <Icon className="w-4 h-4" />}
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Links */}
        <div className="border-t border-border pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              TERMS
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              PRIVACY POLICY
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              COOKIE SETTINGS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}