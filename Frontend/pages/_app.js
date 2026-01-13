import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ThemeProvider } from '../contexts/ThemeContext';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col relative bg-background">
        <Header />
        <main className="flex-grow relative">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;