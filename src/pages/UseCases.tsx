
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { Bot, Clock, DollarSign, BarChart } from "lucide-react";

const UseCases = () => {
  const cases = [
    {
      title: "Customer Service Automation",
      icon: <Bot className="h-8 w-8" />,
      description: "Automate customer inquiries and support tickets with AI-powered chatbots and intelligent routing systems.",
      benefits: ["24/7 Customer Support", "Reduced Response Time", "Consistent Service Quality"],
    },
    {
      title: "Invoice Processing",
      icon: <DollarSign className="h-8 w-8" />,
      description: "Streamline your accounts payable process with automated invoice processing and approval workflows.",
      benefits: ["90% Faster Processing", "Reduced Errors", "Better Cash Flow Management"],
    },
    {
      title: "HR Onboarding",
      icon: <Clock className="h-8 w-8" />,
      description: "Automate employee onboarding processes from document collection to system access provisioning.",
      benefits: ["Standardized Process", "Improved Compliance", "Better Employee Experience"],
    },
    {
      title: "Sales Analytics",
      icon: <BarChart className="h-8 w-8" />,
      description: "Automated sales reporting and analytics to drive better business decisions and forecast accuracy.",
      benefits: ["Real-time Insights", "Accurate Forecasting", "Data-driven Decisions"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-display font-bold"
            >
              Business Automation Use Cases
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-xl text-gray-600"
            >
              Discover how our automation solutions transform businesses across industries
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {cases.map((case_, index) => (
              <motion.div
                key={case_.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-primary mb-4">{case_.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{case_.title}</h3>
                <p className="text-gray-600 mb-6">{case_.description}</p>
                <div className="space-y-2">
                  {case_.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UseCases;
