
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { Award, Users, Globe, Rocket } from "lucide-react";

const About = () => {
  const stats = [
    { label: "Years Experience", value: "10+" },
    { label: "Clients Served", value: "500+" },
    { label: "Team Members", value: "50+" },
    { label: "Countries", value: "20+" },
  ];

  const values = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description: "We strive for excellence in every automation solution we deliver",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Client Focus",
      description: "Our clients' success is at the heart of everything we do",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Innovation",
      description: "We stay ahead of the curve with cutting-edge technology",
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Growth",
      description: "We help businesses scale through intelligent automation",
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
              About AutomatePro
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
            >
              We're on a mission to transform businesses through intelligent automation solutions
            </motion.p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-primary mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-3xl font-semibold text-center mb-8">Our Story</h2>
            <div className="prose max-w-3xl mx-auto text-gray-600">
              <p className="mb-4">
                Founded in 2014, AutomatePro began with a simple vision: to help businesses thrive in the digital age through intelligent automation. What started as a small team of passionate developers has grown into a global leader in business automation solutions.
              </p>
              <p className="mb-4">
                Our journey has been marked by continuous innovation and a relentless focus on delivering value to our clients. We've helped hundreds of businesses across industries streamline their operations, reduce costs, and achieve unprecedented growth through our cutting-edge automation solutions.
              </p>
              <p>
                Today, we continue to push the boundaries of what's possible in business automation, leveraging the latest advances in artificial intelligence and machine learning to create solutions that drive real business results.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
