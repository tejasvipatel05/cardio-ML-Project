import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Droplets,
  Scale,
  Activity,
  Calendar,
  Ban,
  BarChart3,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Heart,
  AlertCircle,
  Stethoscope,
  BookOpen
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function HealthInsights() {
  const insights = [
    {
      title: 'Systolic BP',
      subtitle: 'Crucial Metric',
      icon: TrendingUp,
      description: 'The pressure in your arteries when your heart beats. High values indicate increased strain on blood vessels.',
      normalRange: '90-120 mmHg',
      mlInterpretation: 'Continuous feature with weighted impact on arterial stiffness indices.',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
    {
      title: 'Total Cholesterol',
      subtitle: 'Biomarker',
      icon: Droplets,
      description: 'A measure of the total amount of cholesterol in your blood, including LDL and HDL components.',
      normalRange: '< 200 mg/dL',
      mlInterpretation: 'Analyzed alongside age to predict long-term atherosclerotic risk.',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      title: 'BMI',
      subtitle: 'Physical Metric',
      icon: Scale,
      description: 'Body Mass Index uses height and weight to estimate if a person is at a healthy weight.',
      normalRange: '18.5-24.9 kg/m²',
      mlInterpretation: 'Significant covariate for metabolic syndrome and heart failure risk.',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Blood Glucose',
      subtitle: 'Metabolic',
      icon: Activity,
      description: 'The main sugar found in your blood, which provides energy to your body\'s cells.',
      normalRange: '70-99 mg/dL (Fasting)',
      mlInterpretation: 'Weighted heavily for detecting potential diabetic-related heart complications.',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      title: 'Biological Age',
      subtitle: 'Demographic',
      icon: Calendar,
      description: 'Chronological age is one of the strongest predictors for cardiovascular outcomes.',
      normalRange: 'Cumulative risk exposure',
      mlInterpretation: 'Acts as a non-linear multiplier for all other clinical risk factors.',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Smoking Status',
      subtitle: 'Behavioral',
      icon: Ban,
      description: 'Tobacco use is a primary cause of cardiovascular disease and endothelial dysfunction.',
      normalRange: 'Non-smoker',
      mlInterpretation: 'Binary categorical variable that significantly shifts the risk baseline.',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    }
  ];

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

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-primary/20 space-x-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>EDUCATIONAL GUIDE</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Health Insights Guide</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Explore the clinical parameters used in our machine learning model. Understand how each factor influences your cardiovascular health and how we interpret the data.
          </p>
        </motion.div>

        {/* Health Metrics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="card shadow-lg border-2 border-border group hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start mb-4">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={cn("w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0", insight.bgColor)}
                  >
                    <Icon className={cn("w-6 h-6", insight.color)} />
                  </motion.div>
                  <div className="flex-grow">
                    <div className="text-sm text-muted-foreground uppercase mb-1">{insight.subtitle}</div>
                    <h3 className="text-xl font-bold text-foreground">{insight.title}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{insight.description}</p>
                <div className="mb-4 bg-muted/50 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Normal Range:</div>
                  <div className="font-bold text-foreground">{insight.normalRange}</div>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-1">ML Interpretation:</div>
                  <div className="text-sm text-foreground">{insight.mlInterpretation}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* How our Model Interprets Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="card mb-12 shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6 text-foreground">How our Model Interprets Data</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Unlike traditional risk scores like Framingham or SCORE2 which use static coefficients, CardioML uses <strong className="text-foreground">XGBoost and Neural Network ensembles</strong> to identify complex, non-linear relationships between these factors.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: BarChart3,
                title: 'Feature Importance',
                description: 'We utilize SHAP values to explain exactly which factors contributed most to your specific result.',
                color: 'text-primary',
                bgColor: 'bg-primary/10',
              },
              {
                icon: RefreshCw,
                title: 'Continuous Learning',
                description: 'Our models are retrained quarterly on anonymized clinical datasets to maintain state-of-the-art accuracy.',
                color: 'text-secondary',
                bgColor: 'bg-secondary/10',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex items-start group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={cn("w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0", item.bgColor)}
                >
                  <item.icon className={cn("w-6 h-6", item.color)} />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="card gradient-bg text-primary-foreground text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
          <div className="relative z-10">
            <motion.h2
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4"
            >
              Ready for your personalized report?
            </motion.h2>
            <p className="text-xl mb-8 opacity-90">
              Now that you understand the metrics, see how they apply to your unique health profile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/assessment" className="bg-background text-primary font-semibold py-3 px-8 rounded-lg hover:bg-background/90 transition-colors inline-flex items-center space-x-2 shadow-lg">
                  <Activity className="w-5 h-5" />
                  <span>Start Risk Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/how-it-works" className="border-2 border-background text-background font-semibold py-3 px-8 rounded-lg hover:bg-background/10 transition-colors inline-flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Clinical Documentation</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}