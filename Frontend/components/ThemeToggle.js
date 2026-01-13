import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-12 h-6 rounded-full bg-muted border border-border p-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-foreground flex items-center justify-center shadow-md ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {theme === 'light' ? (
          <Sun className="w-3 h-3 text-background" />
        ) : (
          <Moon className="w-3 h-3 text-background" />
        )}
      </motion.div>
    </motion.button>
  );
}