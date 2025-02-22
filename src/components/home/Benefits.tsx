
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  {
    title: "Easy to Use",
    description: "Simple interface designed for quick results without any learning curve."
  },
  {
    title: "No Registration",
    description: "Start using our tools instantly - no sign-up required."
  },
  {
    title: "Free Forever",
    description: "All tools are completely free to use without any hidden charges."
  },
  {
    title: "Secure Processing",
    description: "Your files are processed locally and never stored on our servers."
  }
];

const Benefits = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-4">Why Choose Our Tools?</h2>
          <p className="text-gray-600">Experience the benefits of our professional-grade tools</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">{benefit.title}</h3>
              </div>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
