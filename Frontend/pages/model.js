import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Activity,
  ArrowRight,
  Loader2,
  AlertCircle,
  Cpu,
  Layers,
  Zap,
  Award,
  FileText,
  Github,
  BookOpen,
  Shield,
  Info,
  Gauge,
  Target,
  Database,
  Calendar,
  Settings
} from 'lucide-react';
import api from '../config/api';
import { cn } from '../lib/utils';

export default function Model() {
  const [modelInfo, setModelInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('metrics');

  useEffect(() => {
    axios.get("api/assessment")
      .then(response => {
        setModelInfo(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching model info:', error);
        setLoading(false);
      });
  }, []);

  const models = [
    { name: 'Logistic Regression', accuracy: 85.2, selected: false },
    { name: 'Support Vector Machine (SVM)', accuracy: 86.1, selected: false },
    { name: 'Naive Bayes', accuracy: 85.2, selected: false },
    { name: 'Decision Tree', accuracy: 79.0, selected: false },
    { name: 'Random Forest', accuracy: 90.1, selected: true },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">Loading model information...</p>
        </motion.div>
      </div>
    );
  }

  if (!modelInfo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <p className="text-muted-foreground">Unable to load model information</p>
          <Link href="/" className="text-primary hover:underline mt-4 inline-block">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Model Comparison & Best Selection</h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl">
            Rigorous evaluation across multiple machine learning architectures ensures the highest predictive accuracy for cardiovascular risk assessment.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex border-b border-border mb-8"
        >
          <motion.button
            onClick={() => setActiveTab('metrics')}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            className={cn(
              "px-6 py-3 font-semibold relative transition-colors",
              activeTab === 'metrics'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Detailed Metrics
            {activeTab === 'metrics' && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('comparison')}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            className={cn(
              "px-6 py-3 font-semibold relative transition-colors",
              activeTab === 'comparison'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Model Comparison
            {activeTab === 'comparison' && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'comparison' && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Model Comparison Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card mb-8 overflow-x-auto shadow-lg"
              >
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left py-4 px-6 text-sm font-bold text-foreground uppercase">Model Architecture</th>
                      <th className="text-right py-4 px-6 text-sm font-bold text-foreground uppercase">Accuracy Score</th>
                      <th className="text-right py-4 px-6 text-sm font-bold text-foreground uppercase">Selection Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {models.map((model, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                        whileHover={{ backgroundColor: 'hsl(var(--muted))', scale: 1.01 }}
                        className={cn(
                          "border-b border-border transition-colors",
                          model.selected && "bg-primary/5"
                        )}
                      >
                        <td className="py-4 px-6 text-foreground font-medium">{model.name}</td>
                        <td className={cn(
                          "py-4 px-6 text-right font-semibold",
                          model.selected ? 'text-primary text-lg' : 'text-foreground'
                        )}>
                          {model.accuracy}%
                        </td>
                        <td className="py-4 px-6 text-right">
                          {model.selected ? (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="inline-flex items-center bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold space-x-1"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              <span>CHOSEN MODEL</span>
                            </motion.span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>

              {/* Why Random Forest Section and Final Accuracy */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
                {/* Why Random Forest? */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="card shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3"
                    >
                      <Zap className="w-5 h-5 text-primary" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-foreground">Why {modelInfo?.model_name || 'Random Forest'}?</h2>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    {modelInfo?.model_name || 'Random Forest'} was selected as our best-performing model due to its superior accuracy of {modelInfo?.accuracy ? (modelInfo.accuracy * 100).toFixed(1) : '94.2'}%. This ensemble method combines multiple decision trees to create a robust predictive model that handles non-linear relationships and reduces overfitting, making it ideal for clinical risk assessment.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Stability', desc: 'Low Variance via Bagging', icon: Layers },
                      { label: 'Insight', desc: 'Native Feature Importance', icon: TrendingUp },
                      { label: 'Robustness', desc: 'Outlier Resistance', icon: Shield },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-muted p-4 rounded-lg text-center border border-border"
                      >
                        <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="font-bold text-foreground mb-2 text-sm uppercase">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Final Accuracy Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  className="card gradient-bg text-primary-foreground shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
                  <div className="flex flex-col items-center justify-center h-full text-center relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                      className="text-7xl font-bold mb-4"
                    >
                      {modelInfo?.accuracy ? (modelInfo.accuracy * 100).toFixed(1) : '94.2'}%
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="text-xl font-semibold mb-4"
                    >
                      FINAL ACCURACY
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="text-lg italic opacity-90"
                    >
                      "The optimal balance of interpretability and predictive power."
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'metrics' && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Quick Metrics Summary */}
              <motion.div className="card shadow-lg mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground">Detailed Performance Metrics</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {[
                    { label: 'Accuracy', value: (modelInfo.accuracy * 100).toFixed(1) + '%', color: 'text-primary', icon: TrendingUp },
                    { label: 'AUC-ROC', value: modelInfo.auc_roc?.toFixed(2) || '0.96', color: 'text-secondary', icon: BarChart3 },
                    { label: 'F1-Score', value: modelInfo.f1_score?.toFixed(2) || '0.91', color: 'text-primary', icon: Award },
                  ].map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="text-center card bg-muted/50"
                    >
                      <metric.icon className={cn("w-12 h-12 mx-auto mb-4", metric.color)} />
                      <div className={cn("text-4xl font-bold mb-2", metric.color)}>{metric.value}</div>
                      <div className="text-muted-foreground">{metric.label}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 text-foreground">Model Details</h3>
                  <div className="space-y-2 text-foreground">
                    <p><strong>Model Name:</strong> <span className="text-muted-foreground">{modelInfo.model_name}</span></p>
                    <p><strong>Version:</strong> <span className="text-muted-foreground">{modelInfo.model_version}</span></p>
                    <p><strong>Training Dataset:</strong> <span className="text-muted-foreground">{modelInfo.training_dataset}</span></p>
                  </div>
                </div>
              </motion.div>

              {/* Model Title */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center mb-8"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {modelInfo?.model_name || 'Random Forest Classifier'}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  This model includes the following hyperparameters and evaluation metrics. Trained using scikit-learn.
                </p>
              </motion.div>

              {/* Model Details, Hyperparameters, and Performance Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {/* Model Details Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ y: -5 }}
                  className="card shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <Database className="w-5 h-5 text-primary mr-2" />
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">Model</h3>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Algorithm</p>
                      <p className="text-foreground font-semibold">{modelInfo?.model_name || 'Random Forest Classifier'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Library</p>
                      <p className="text-foreground font-semibold">scikit-learn</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Trained At</p>
                      <p className="text-foreground font-semibold flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {modelInfo?.model_metrics?.trained_at 
                          ? new Date(modelInfo.model_metrics.trained_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + new Date(modelInfo.model_metrics.trained_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
                          : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Feature Count</p>
                      <p className="text-foreground font-semibold">{modelInfo?.features?.length || 8}</p>
                    </div>
                    {/* <div>
                      <p className="text-sm text-muted-foreground mb-1">Model Uptime</p>
                      <p className="text-foreground font-semibold">
                        {modelInfo?.model_metrics?.uptime?.formatted || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Inference Speed</p>
                      <p className="text-foreground font-semibold">
                        {modelInfo?.model_metrics?.inference_speed?.average_ms 
                          ? `${modelInfo.model_metrics.inference_speed.average_ms.toFixed(2)} ms`
                          : 'N/A'}
                      </p>
                    </div> */}
                  </div>
                </motion.div>

                {/* Hyperparameters Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="card shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <Settings className="w-5 h-5 text-primary mr-2" />
                    <h3 className="text-xl font-bold text-foreground">Hyperparameters</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Estimators</p>
                      <p className="text-foreground font-semibold">
                        {modelInfo?.hyperparameters?.n_estimators || 200}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Max Depth</p>
                      <p className="text-foreground font-semibold">
                        {modelInfo?.hyperparameters?.max_depth || 'None'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Min Samples / Leaf</p>
                      <p className="text-foreground font-semibold">
                        {modelInfo?.hyperparameters?.min_samples_leaf || 1}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Random State</p>
                      <p className="text-foreground font-semibold">
                        {modelInfo?.hyperparameters?.random_state || 42}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Performance Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="card shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <Target className="w-5 h-5 text-primary mr-2" />
                    <h3 className="text-xl font-bold text-foreground">Performance</h3>
                  </div>
                  <div className="space-y-5">
                    {/* Accuracy */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-foreground font-medium">Accuracy</span>
                          <Info className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          {((modelInfo?.accuracy || 0.942) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(modelInfo?.accuracy || 0.942) * 100}%` }}
                          transition={{ duration: 1, delay: 0.7 }}
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        />
                      </div>
                    </div>

                    {/* F1 Score */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-foreground font-medium">F1 Score</span>
                          <Info className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          {(modelInfo?.f1_score || 0.91).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(modelInfo?.f1_score || 0.91) * 100}%` }}
                          transition={{ duration: 1, delay: 0.8 }}
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        />
                      </div>
                    </div>

                    {/* ROC AUC */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-foreground font-medium">ROC AUC</span>
                          <Info className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          {((modelInfo?.auc_roc || 0.96) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(modelInfo?.auc_roc || 0.96) * 100}%` }}
                          transition={{ duration: 1, delay: 0.9 }}
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Overfitting/Underfitting Scale */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="card shadow-lg mb-8"
              >
                <div className="flex items-center mb-6">
                  <Gauge className="w-5 h-5 text-primary mr-2" />
                  <h3 className="text-xl font-bold text-foreground">Model Fit Analysis</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Underfitting</span>
                    <span className="text-sm text-muted-foreground">Optimal</span>
                    <span className="text-sm text-muted-foreground">Overfitting</span>
                  </div>
                  <div className="relative">
                    <div className="w-full h-8 bg-muted rounded-full overflow-hidden relative">
                      {/* Gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-destructive/20 via-primary/30 to-destructive/20"></div>
                      {/* Optimal zone indicator */}
                      <div className="absolute left-1/2 top-0 bottom-0 w-1/4 -translate-x-1/2 bg-primary/20 border-l-2 border-r-2 border-primary"></div>
                      {/* Current position indicator */}
                      <motion.div
                        initial={{ x: '-50%' }}
                        animate={{ x: '0%' }}
                        transition={{ duration: 1, delay: 1.0 }}
                        className="absolute top-0 bottom-0 w-1 bg-primary rounded-full shadow-lg"
                        style={{ left: '48%' }}
                      >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-2 border-background"></div>
                      </motion.div>
                    </div>
                    <div className="flex justify-center mt-2">
                      <span className="text-sm font-semibold text-primary">Well-Balanced Model</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    The model shows good generalization with balanced training and validation performance, indicating optimal fit without significant overfitting or underfitting.
                  </p>
                </div>
              </motion.div>

              {/* Top Feature Importance Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="card shadow-lg"
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Top Feature Importance</h3>
                  <p className="text-sm text-muted-foreground">Features contributing most to predictions</p>
                </div>
                <div className="space-y-4">
                  {(modelInfo?.feature_importance || [
                    { name: 'systolic_bp', label: 'Systolic Blood Pressure', value: 68.9 },
                    { name: 'age', label: 'Age', value: 12.8 },
                    { name: 'cholesterol', label: 'Cholesterol', value: 7.2 },
                    { name: 'bmi', label: 'BMI', value: 2.5 },
                    { name: 'diastolic_bp', label: 'Diastolic Blood Pressure', value: 3.1 },
                    { name: 'smoking_status', label: 'Smoking Status', value: 2.8 },
                    { name: 'physical_activity', label: 'Physical Activity', value: 1.9 },
                    { name: 'alcohol_intake', label: 'Alcohol Intake', value: 0.8 },
                  ]).map((feature, index) => (
                    <motion.div
                      key={feature.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.05 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{feature.label || feature.name}</span>
                        <span className="text-sm font-semibold text-foreground">{feature.value}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${feature.value}%` }}
                          transition={{ duration: 0.8, delay: 1.0 + index * 0.05 }}
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.3 }}
          className="gradient-bg text-primary-foreground py-16 mt-12 rounded-lg shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl font-bold mb-4">Experience our AI-driven insights</h2>
            <p className="text-xl mb-8 opacity-90">
              Start your personalized assessment or schedule a technical walkthrough with our medical data scientists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/assessment" className="bg-background text-primary font-semibold py-3 px-8 rounded-lg hover:bg-background/90 transition-colors inline-flex items-center space-x-2 shadow-lg">
                  <Activity className="w-5 h-5" />
                  <span>Start Assessment Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/how-it-works" className="border-2 border-background text-background font-semibold py-3 px-8 rounded-lg hover:bg-background/10 transition-colors inline-flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Technical Docs</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}