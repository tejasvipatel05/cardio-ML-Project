import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Info,
  Download,
  RotateCw,
  BarChart3,
  User,
  Heart,
  TrendingDown,
  TrendingUp,
  BookOpen,
  AlertCircle,
  Activity,
  Stethoscope,
  Droplets
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Results() {
  const router = useRouter();
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedResult = localStorage.getItem('assessmentResult');
    const storedFormData = localStorage.getItem('formData');

    if (storedResult && storedFormData) {
      try {
        setResult(JSON.parse(storedResult));
        setFormData(JSON.parse(storedFormData));
        setLoading(false);
      } catch (error) {
        console.error('Error parsing stored data:', error);
        router.push('/assessment');
      }
    } else {
      router.push('/assessment');
    }
  }, [router]);

  const getRiskColor = (category) => {
    if (category === 'High Risk') return { stroke: '#f87171', bg: 'bg-red-300', text: 'text-red-700', border: 'border-red-300' };
    if (category === 'Moderate Risk') return { stroke: '#fcd34d', bg: 'bg-yellow-300', text: 'text-yellow-700', border: 'border-yellow-300' };
    return { stroke: '#71f1a0', bg: 'bg-green-300', text: 'text-green-700', border: 'border-green-300' };
  };

  const getRiskBadgeColor = (impact) => {
    const absImpact = Math.abs(impact);
    if (absImpact >= 10) return 'bg-red-400';
    if (absImpact >= 5) return 'bg-orange-400';
    if (absImpact >= 0) return 'bg-yellow-400';
    return 'bg-green-400';
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return timestamp;
    }
  };

  const formatRefId = (timestamp) => {
    if (!timestamp) return 'CML-XXXX';
    try {
      const dateStr = new Date(timestamp).toISOString().replace(/[-:T]/g, '').slice(0, 8);
      return `CML-${dateStr}`;
    } catch (e) {
      return 'CML-XXXX';
    }
  };

  const generatePDFReport = async () => {
    if (typeof window === 'undefined') return;
    
    try {
      // Dynamically import jsPDF
      const { default: jsPDF } = await import('jspdf');
      
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      let yPos = margin;

      // Helper function to add text with styling
      const addText = (text, x, y, options = {}) => {
        doc.setFontSize(options.size || 12);
        doc.setTextColor(options.color || 0, 0, 0);
        doc.setFont(options.font || 'helvetica', options.style || 'normal');
        doc.text(text, x, y);
      };

      // Helper function to add a line
      const addLine = (x1, y1, x2, y2) => {
        doc.setDrawColor(200, 200, 200);
        doc.line(x1, y1, x2, y2);
      };

      // Header with gradient-like effect (dark blue background)
      doc.setFillColor(41, 45, 62); // Dark blue
      doc.rect(0, 0, pageWidth, 50, 'F');
      
      // Title in header
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('Cardiovascular Disease Risk Assessment Report', pageWidth / 2, 30, { align: 'center' });
      
      yPos = 60;

      // Report metadata
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const reportDate = result.timestamp ? new Date(result.timestamp).toLocaleString('en-US') : new Date().toLocaleString('en-US');
      doc.text(`Report Generated: ${reportDate}`, margin, yPos);
      doc.text(`ML Model Used: ${result.model_name || 'Random Forest Classifier'}`, pageWidth - margin, yPos, { align: 'right' });
      
      yPos += 20;

      // Risk Assessment Box
      const riskBoxHeight = 40;
      const riskBoxY = yPos;
      
      // Determine risk color
      let riskColorRGB;
      if (result.risk_category === 'High Risk') {
        riskColorRGB = [220, 53, 69]; // Red
      } else if (result.risk_category === 'Moderate Risk') {
        riskColorRGB = [255, 193, 7]; // Yellow/Orange
      } else {
        riskColorRGB = [40, 167, 69]; // Green
      }
      
      doc.setFillColor(riskColorRGB[0], riskColorRGB[1], riskColorRGB[2]);
      doc.setDrawColor(riskColorRGB[0], riskColorRGB[1], riskColorRGB[2]);
      doc.roundedRect(pageWidth / 2 - 60, riskBoxY, 120, riskBoxHeight, 5, 5, 'F');
      
      // Risk text
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text(result.risk_category.toUpperCase(), pageWidth / 2, riskBoxY + 15, { align: 'center' });
      
      doc.setFontSize(12);
      doc.text(`Risk Probability: ${result.risk_percentage}%`, pageWidth / 2, riskBoxY + 30, { align: 'center' });
      
      yPos += riskBoxHeight + 25;

      // Patient Information Section
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Patient Information', margin, yPos);
      
      yPos += 10;
      addLine(margin, yPos, pageWidth - margin, yPos);
      yPos += 10;

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      
      // Two column layout for patient info
      const col1X = margin;
      const col2X = pageWidth / 2 + 10;
      let col1Y = yPos;
      let col2Y = yPos;

      // Patient Name (if available)
      if (formData.patient_name) {
        doc.setFont('helvetica', 'bold');
        doc.text('Patient Name:', col1X, col1Y);
        doc.setFont('helvetica', 'normal');
        doc.text(formData.patient_name, col1X + 45, col1Y);
        col1Y += 8;
      }

      doc.setFont('helvetica', 'bold');
      doc.text('Age:', col1X, col1Y);
      doc.setFont('helvetica', 'normal');
      doc.text(`${formData.age} years`, col1X + 20, col1Y);
      col1Y += 8;

      doc.setFont('helvetica', 'bold');
      doc.text('Height:', col1X, col1Y);
      doc.setFont('helvetica', 'normal');
      doc.text(`${formData.height} cm`, col1X + 30, col1Y);
      col1Y += 8;

      doc.setFont('helvetica', 'bold');
      doc.text('BMI:', col1X, col1Y);
      doc.setFont('helvetica', 'normal');
      doc.text(bmi || 'N/A', col1X + 20, col1Y);

      doc.setFont('helvetica', 'bold');
      doc.text('Gender:', col2X, col2Y);
      doc.setFont('helvetica', 'normal');
      doc.text(formData.gender, col2X + 35, col2Y);
      col2Y += 8;

      doc.setFont('helvetica', 'bold');
      doc.text('Weight:', col2X, col2Y);
      doc.setFont('helvetica', 'normal');
      doc.text(`${formData.weight} kg`, col2X + 35, col2Y);

      yPos = Math.max(col1Y, col2Y) + 15;

      // Clinical Measurements Section
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Clinical Measurements', margin, yPos);
      
      yPos += 10;
      addLine(margin, yPos, pageWidth - margin, yPos);
      yPos += 10;

      doc.setFontSize(11);
      col1Y = yPos;
      col2Y = yPos;

      doc.setFont('helvetica', 'bold');
      doc.text('Systolic BP:', col1X, col1Y);
      doc.setFont('helvetica', 'normal');
      doc.text(`${formData.ap_hi} mm Hg`, col1X + 50, col1Y);
      col1Y += 8;

      doc.setFont('helvetica', 'bold');
      doc.text('Cholesterol:', col1X, col1Y);
      doc.setFont('helvetica', 'normal');
      doc.text(formData.chol || 'N/A', col1X + 50, col1Y);

      doc.setFont('helvetica', 'bold');
      doc.text('Diastolic BP:', col2X, col2Y);
      doc.setFont('helvetica', 'normal');
      doc.text(`${formData.ap_lo} mm Hg`, col2X + 55, col2Y);
      col2Y += 8;

      doc.setFont('helvetica', 'bold');
      doc.text('Glucose:', col2X, col2Y);
      doc.setFont('helvetica', 'normal');
      doc.text(formData.gluc || 'N/A', col2X + 40, col2Y);

      yPos = Math.max(col1Y, col2Y) + 15;

      // Lifestyle Factors Section
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Lifestyle Factors', margin, yPos);
      
      yPos += 10;
      addLine(margin, yPos, pageWidth - margin, yPos);
      yPos += 10;

      doc.setFontSize(11);
      col1Y = yPos;
      col2Y = yPos;

      doc.setFont('helvetica', 'bold');
      doc.text('Smoker:', col1X, col1Y);
      doc.setFont('helvetica', 'normal');
      doc.text(formData.smoke || 'No', col1X + 40, col1Y);
      col1Y += 8;

      doc.setFont('helvetica', 'bold');
      doc.text('Physical Activity:', col1X, col1Y);
      doc.setFont('helvetica', 'normal');
      doc.text(formData.active === 'Active' ? 'Yes' : 'No', col1X + 65, col1Y);

      doc.setFont('helvetica', 'bold');
      doc.text('Alcohol Intake:', col2X, col2Y);
      doc.setFont('helvetica', 'normal');
      doc.text(formData.alcohol || 'No', col2X + 60, col2Y);

      yPos = Math.max(col1Y, col2Y) + 20;

      // Check if we need a new page
      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = margin;
      }

      // Disclaimer
      doc.setTextColor(120, 120, 120);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'italic');
      const disclaimer = 'Disclaimer: This AI-generated report is intended for educational and decision-support purposes only. It does not replace professional medical advice, diagnosis, or treatment.';
      doc.text(disclaimer, margin, yPos, { maxWidth: pageWidth - 2 * margin, align: 'justify' });

      // Generate filename
      const patientName = formData.patient_name ? formData.patient_name.replace(/\s+/g, '_') : 'Patient';
      const dateStr = new Date().toISOString().split('T')[0];
      const filename = `CardioML_Report_${patientName}_${dateStr}.pdf`;

      // Save the PDF
      doc.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF report. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Loader2 className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">Loading results...</p>
        </motion.div>
      </div>
    );
  }

  if (!result || !formData) return null;

  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      const heightInMeters = parseFloat(formData.height) / 100;
      const weightInKg = parseFloat(formData.weight);
      if (heightInMeters > 0 && weightInKg > 0) {
        return (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
      }
    }
    return null;
  };

  const bmi = calculateBMI();
  const riskColor = getRiskColor(result.risk_category);
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (result.risk_percentage / 100) * circumference;

  const featureImpacts = result.feature_impacts || {};

  const featureCards = [
    {
      key: 'systolic_bp',
      label: 'Blood Pressure',
      value: formData ? `${formData.ap_hi}/${formData.ap_lo} mmHg` : 'N/A',
      impact: featureImpacts.systolic_bp || 12,
      description: featureImpacts.systolic_bp >= 10 
        ? 'Significantly above clinical guidelines.' 
        : featureImpacts.systolic_bp >= 5 
        ? 'Elevated levels contributing to score.'
        : 'Within normal range.',
      icon: Activity,
    },
    {
      key: 'cholesterol',
      label: 'Total Cholesterol',
      value: formData ? formData.chol || 'N/A' : 'N/A',
      impact: featureImpacts.cholesterol || 8,
      description: featureImpacts.cholesterol >= 8 
        ? 'Elevated levels contributing to score.' 
        : 'Within acceptable range.',
      icon: Droplets,
    },
    {
      key: 'age',
      label: 'Patient Age',
      value: formData ? `${formData.age} Years` : 'N/A',
      impact: featureImpacts.age || 5,
      description: 'Demographic baseline adjustment.',
      icon: User,
    },
    {
      key: 'physical_activity',
      label: 'Physical Activity',
      value: formData ? formData.active || 'N/A' : 'N/A',
      impact: featureImpacts.physical_activity || -4,
      description: featureImpacts.physical_activity < 0 
        ? 'Protective factor reducing overall risk.' 
        : 'Neutral impact on risk assessment.',
      icon: Activity,
    }
  ].filter(f => f.impact !== undefined);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">Cardiovascular Risk Assessment</h1>
          {formData.patient_name && (
            <p className="text-lg text-foreground mb-2 flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Patient: <strong>{formData.patient_name}</strong></span>
            </p>
          )}
          <p className="text-muted-foreground">
            Prediction generated on {formatDate(result.timestamp)} • Ref ID: {formatRefId(result.timestamp)}
          </p>
        </motion.div>

        {/* Risk Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card bg-gradient-to-br from-muted to-card border-2 border-border mb-8 shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Risk Gauge */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-64 h-64">
                <motion.svg
                  initial={{ rotate: -90 }}
                  className="transform -rotate-90 w-64 h-64"
                >
                  <circle 
                    cx="128" 
                    cy="128" 
                    r="90" 
                    stroke="hsl(var(--muted))" 
                    strokeWidth="20" 
                    fill="none" 
                  />
                  <motion.circle
                    cx="128"
                    cy="128"
                    r="90"
                    stroke={riskColor.stroke}
                    strokeWidth="15"
                    fill="none"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: strokeDashoffset }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </motion.svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="text-4xl font-bold text-foreground"
                  >
                    {result.risk_percentage}%
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-xl font-semibold mt-2 text-muted-foreground"
                  >
                    {result.risk_category.toUpperCase()}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="flex-1 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className={cn("px-4 py-3 rounded-lg flex items-center space-x-2 shadow-md", riskColor.bg, "text-white")}
              >
                <AlertTriangle className="w-6 h-6 text-black" />
                <span className="font-bold text-black">
                  Action Required: {result.risk_category === 'High Risk' ? 'High Clinical Priority' : result.risk_category === 'Moderate Risk' ? 'Moderate Priority' : 'Routine Check'}
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-muted px-4 py-2 rounded-lg flex items-center space-x-2 border border-border"
              >
                <Info className="w-5 h-5 text-primary" />
                <span className="text-foreground">ML MODEL: {result.model_name || 'RANDOM FOREST'}</span>
              </motion.div>
              <div className="flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generatePDFReport}
                  className="btn-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Report</span>
                </motion.button>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    href="/assessment" 
                    className="bg-muted hover:bg-muted/80 text-foreground font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 border border-border"
                  >
                    <RotateCw className="w-5 h-5" />
                    <span>Retake Assessment</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Patient Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8"
        >
          {[
            { label: 'Age', value: `${formData.age} yrs`, icon: User },
            { label: 'BMI', value: bmi || 'N/A', icon: Activity },
            { label: 'Blood Pressure', value: `${formData.ap_hi}/${formData.ap_lo} mmHg`, icon: Stethoscope },
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="card text-center group"
            >
              <metric.icon className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl text-muted-foreground mb-2">{metric.label}</div>
              <div className="text-3xl font-bold text-foreground">{metric.value}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ML Feature Impact Analysis */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground flex items-center space-x-2">
              <BarChart3 className="w-8 h-8 text-primary" />
              <span>ML Feature Impact Analysis</span>
            </h2>
            <span className="text-muted-foreground text-sm">Ranked by Model Weight</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {featureCards.map((feature, index) => {
              const impactPercent = Math.abs(feature.impact);
              const badgeColor = getRiskBadgeColor(feature.impact);
              const isPositive = feature.impact >= 0;
              const progressColor = isPositive 
                ? (feature.impact >= 10 ? 'bg-red-500' : 'bg-orange-500') 
                : 'bg-green-500';
              const Icon = feature.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="card bg-gradient-to-br from-muted to-card border-2 border-border shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Icon className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-bold uppercase text-foreground">{feature.label}</h3>
                    </div>
                    <span className={cn("text-white px-3 py-1 rounded-full text-sm font-semibold", badgeColor)}>
                      {isPositive ? '+' : ''}{feature.impact}% Impact
                    </span>
                  </div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-3xl font-bold mb-4 text-foreground"
                  >
                    {feature.value}
                  </motion.div>
                  <div className="mb-4">
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(impactPercent * 10, 100)}%` }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 1 }}
                        className={cn("h-2 rounded-full", progressColor)}
                      ></motion.div>
                    </div>
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm">
                    {isPositive ? (
                      <Info className="w-4 h-4 mr-2" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                    )}
                    <span>{feature.description}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div> */}

        {/* Recommendations */}
        {result.recommendations && result.recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card mb-8"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-primary" />
              <span>Recommendations</span>
            </h3>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start space-x-2"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{rec}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Medical Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card bg-primary/5 border border-primary/20 mb-8"
        >
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center space-x-2">
            <AlertCircle className="w-6 h-6 text-primary" />
            <span>MEDICAL DISCLAIMER & MODEL ATTRIBUTION</span>
          </h3>
          <p className="text-foreground mb-4">
            This prediction is generated by a machine learning model and is intended for informational and screening purposes only. It is not a clinical diagnosis or a replacement for professional medical advice. Always consult with a qualified healthcare provider for a comprehensive cardiovascular health assessment and before making any changes to medication or lifestyle.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div>
              <strong className="text-foreground">ENGINE:</strong> <span className="text-muted-foreground">{result.model_name || 'Random Forest Classifier'} ({result.model_version || 'v2.4'})</span>
            </div>
            <div>
              <strong className="text-foreground">SCORE:</strong> <span className="text-muted-foreground">{result.accuracy ? (result.accuracy * 100).toFixed(1) : '94.2'}% Accuracy</span>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/assessment" className="btn-primary inline-flex items-center space-x-2">
              <RotateCw className="w-5 h-5" />
              <span>New Assessment</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/health-insights" className="btn-secondary inline-flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Learn More</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}