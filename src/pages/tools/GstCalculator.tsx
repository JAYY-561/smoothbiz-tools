
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GstCalculator = () => {
  const [beforeGst, setBeforeGst] = useState<string>("");
  const [gstAmount, setGstAmount] = useState<string>("");
  const [afterGst, setAfterGst] = useState<string>("");
  const [gstRate] = useState<number>(18); // Default GST rate

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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/tools" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tools
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-display font-bold mb-4">GST Calculator</h1>
            <p className="text-xl text-gray-600">Calculate GST amount and total price</p>
          </motion.div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Calculator className="h-12 w-12 mx-auto text-primary mb-4" />
                <p className="text-gray-600">Enter any two values to calculate the third</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="before-gst">Amount Before GST</Label>
                  <Input
                    id="before-gst"
                    type="text"
                    value={beforeGst}
                    onChange={(e) => handleInputChange(e.target.value, setBeforeGst, [setGstAmount, setAfterGst])}
                    placeholder="Enter amount before GST"
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
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GstCalculator;
