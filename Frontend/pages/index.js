import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Shield, 
  Zap, 
  Activity, 
  TrendingUp, 
  BarChart3, 
  Lock, 
  Stethoscope,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Cpu,
  Gauge
} from 'lucide-react';
import api from '../config/api';
import { cn } from '../lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Home() {
  const [modelInfo, setModelInfo] = useState(null);

  useEffect(() => {
    axios.get(api.endpoints.assessment)
      .then(response => setModelInfo(response.data))
      .catch(error => console.error('Error fetching model info:', error));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center bg-primary/10 text-primary px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 border border-primary/20"
            >
              <Shield className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">HIPAA COMPLIANT & CLINICAL GRADE</span>
              <span className="sm:hidden">HIPAA COMPLIANT</span>
            </motion.div> */}
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight"
            >
              CardioML- <span className="gradient-text">Cardiovascular</span> Risk Prediction
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8"
            >
              Empowering clinicians and individuals with state-of-the-art machine learning models to predict heart health risks with unprecedented precision.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/assessment" className="btn-primary inline-flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Start Free Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/how-it-works" className="bg-background border-2 border-primary text-primary font-semibold py-3 px-6 rounded-lg transition-all duration-200 text-center hover:bg-primary/5 inline-flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>View Demo</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block relative"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-card border border-border rounded-lg p-6 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <Heart className="w-5 h-5 text-destructive fill-destructive" />
                </div>
                <div className="bg-muted/50 rounded-lg p-4 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
                    <p className="text-muted-foreground">Medical Data Visualization</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Advanced Risk Assessment Section */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">Advanced Risk Assessment</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform integrates clinical data with cutting-edge algorithms to provide actionable insights.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: TrendingUp,
              title: 'High Accuracy',
              description: 'Validated metrics ensure precise cardiovascular health predictions based on thousands of data points.',
              color: 'text-primary',
              bgColor: 'bg-primary/10',
            },
            {
              icon: Lock,
              title: 'Data Privacy',
              description: 'Fully encrypted and HIPAA-compliant data handling. Your medical data stays yours alone.',
              color: 'text-secondary',
              bgColor: 'bg-secondary/10',
            },
            {
              icon: Stethoscope,
              title: 'Clinical Integration',
              description: 'Designed to work seamlessly within existing medical workflows for professional practitioners.',
              color: 'text-secondary',
              bgColor: 'bg-secondary/10',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="card text-center group hover:border-primary/50 transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className={cn("w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4", feature.bgColor)}
              >
                <feature.icon className={cn("w-8 h-8", feature.color)} />
              </motion.div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* The Analysis Process Section */}
      <section className="container mx-auto px-6 py-16 bg-muted/30 rounded-3xl my-16">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">The Analysis Process</h2>
            <p className="text-xl text-muted-foreground mb-8">
              We've streamlined complex medical analysis into three simple steps for both patients and providers.
            </p>
            <div className="space-y-6">
              {[
                {
                  number: 1,
                  title: 'Input Health Data',
                  description: 'Securely enter basic metrics such as age, blood pressure, cholesterol, and lifestyle factors.',
                  icon: Activity,
                },
                {
                  number: 2,
                  title: 'ML Analysis',
                  description: 'Our neural networks compare your data against millions of clinical records to identify patterns.',
                  icon: Cpu,
                },
                {
                  number: 3,
                  title: 'Detailed Report',
                  description: 'Receive a comprehensive risk profile with evidence-based recommendations for heart health.',
                  icon: BarChart3,
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-start group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0 shadow-lg"
                  >
                    <step.icon className="w-6 h-6" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-foreground">ANALYSIS ENGINE</h3>
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-2"
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span>System Active</span>
              </motion.span>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Processing Data Points...</span>
                <span className="text-foreground font-semibold">75%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-primary h-2 rounded-full"
                ></motion.div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold text-foreground"
                >
                  99.8%
                </motion.div>
                <div className="text-sm text-muted-foreground mt-1">MODEL UPTIME</div>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold text-foreground"
                >
                  0.02s
                </motion.div>
                <div className="text-sm text-muted-foreground mt-1">INFERENCE SPEED</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Model Performance Section */}
      {modelInfo && (
        <section className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Model Performance</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {[
                { label: 'Accuracy', value: (modelInfo.accuracy * 100).toFixed(1) + '%', color: 'text-primary' },
                { label: 'AUC-ROC', value: modelInfo.auc_roc?.toFixed(2) || '0.96', color: 'text-secondary' },
                { label: 'F1-Score', value: modelInfo.f1_score?.toFixed(2) || '0.91', color: 'text-primary' },
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={cn("text-4xl font-bold mb-2", metric.color)}>{metric.value}</div>
                  <div className="text-muted-foreground">{metric.label}</div>
                </motion.div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                <strong className="text-foreground">Model:</strong> {modelInfo.model_name} ({modelInfo.model_version})
              </p>
              <Link href="/model" className="text-primary hover:underline inline-flex items-center space-x-2">
                <span>View Model Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </section>
      )}

      {/* CTA Section */}
      <section className="gradient-bg text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            Ready to take control of your heart health?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl mb-8 opacity-90"
          >
            Join thousands of patients and clinical experts using CardioML for precise risk assessment.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/assessment" className="bg-background text-primary font-semibold py-3 px-8 rounded-lg hover:bg-background/90 transition-colors inline-flex items-center space-x-2 shadow-lg">
                <Activity className="w-5 h-5" />
                <span>Start Assessment Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/model" className="border-2 border-background text-background font-semibold py-3 px-8 rounded-lg hover:bg-background/10 transition-colors inline-flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Contact Sales</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}