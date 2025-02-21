
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calculator, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GstCalculator = () => {
  const [beforeGst, setBeforeGst] = useState<string>("");
  const [gstAmount, setGstAmount] = useState<string>("");
  const [afterGst, setAfterGst] = useState<string>("");
  const [gstRate] = useState<number>(18);

  const calculateMissingValue = () => {
    const before = parseFloat(beforeGst);
    const gst = parseFloat(gstAmount);
    const after = parseFloat(afterGst);

    if (!isNaN(before) && !isNaN(gst)) {
      setAfterGst((before + gst).toFixed(2));
    } else if (!isNaN(before) && !isNaN(after)) {
      setGstAmount((after - before).toFixed(2));
    } else if (!isNaN(gst) && !isNaN(after)) {
      setBeforeGst((after - gst).toFixed(2));
    }
  };

  useEffect(() => {
    calculateMissingValue();
  }, [beforeGst, gstAmount, afterGst]);

  const handleInputChange = (
    value: string,
    setter: (value: string) => void,
    otherSetters: ((value: string) => void)[]
  ) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setter(value);
      otherSetters.forEach(setterFn => setterFn(""));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      <Navigation />
      
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link to="/tools" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tools
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block px-6 py-2 bg-blue-50 rounded-full text-primary font-medium mb-6">
                Free Calculator Tool
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                Simple GST Calculator
                <span className="text-primary block mt-2">Made for Businesses</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Calculate GST amounts instantly. Enter any two values and let our calculator do the work for you.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Real-time calculations</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>No registration required</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Simple and intuitive interface</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Calculator className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">GST Calculator</h2>
                <p className="text-gray-600">Enter any two values to calculate the third</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="before-gst">Amount Before GST</Label>
                  <Input
                    id="before-gst"
                    type="text"
                    value={beforeGst}
                    onChange={(e) => handleInputChange(e.target.value, setBeforeGst, [setGstAmount, setAfterGst])}
                    placeholder="Enter amount before GST"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="gst-amount">GST Amount ({gstRate}%)</Label>
                  <Input
                    id="gst-amount"
                    type="text"
                    value={gstAmount}
                    onChange={(e) => handleInputChange(e.target.value, setGstAmount, [setBeforeGst, setAfterGst])}
                    placeholder="Enter GST amount"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="after-gst">Amount After GST</Label>
                  <Input
                    id="after-gst"
                    type="text"
                    value={afterGst}
                    onChange={(e) => handleInputChange(e.target.value, setAfterGst, [setBeforeGst, setGstAmount])}
                    placeholder="Enter amount after GST"
                    className="mt-1"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
              <p className="text-gray-600">Simple interface designed for quick calculations</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-600">Get results immediately as you type</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Always Free</h3>
              <p className="text-gray-600">No hidden charges or subscription required</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-20 text-center"
          >
            <h2 className="text-2xl font-semibold mb-4">Explore More Tools</h2>
            <Link
              to="/tools"
              className="inline-flex items-center text-primary hover:text-primary-hover gap-2"
            >
              View All Tools <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GstCalculator;
