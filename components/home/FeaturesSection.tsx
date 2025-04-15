"use client"

import { motion } from "framer-motion";
import { MessageSquare, ShoppingBag, Code } from 'lucide-react';

const features = [
  {
    title: "Real-time AI Responses",
    description: "Our AI answers product questions instantly, providing accurate information without human intervention.",
    icon: MessageSquare,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Product Recommendations",
    description: "Smart product suggestions based on customer inquiries and browsing behavior to increase conversions.",
    icon: ShoppingBag,
    color: "bg-purple-500/10 text-purple-500",
  },
  // {
  //   title: "Automatic Escalation",
  //   description: "Out-of-scope questions get automatically routed to your support team via email with context included.",
  //   icon: MailPlus,
  //   color: "bg-amber-500/10 text-amber-500",
  // },
  {
    title: "Simple Integration",
    description: "Just one line of code to add ChattercraftAI to any website, with special plugins for Shopify and WordPress.",
    icon: Code,
    color: "bg-green-500/10 text-green-500",
  },
  // {
  //   title: "Analytics Dashboard",
  //   description: "Track performance metrics, customer satisfaction, and gain insights from conversation history.",
  //   icon: BarChart,
  //   color: "bg-indigo-500/10 text-indigo-500",
  // },
  // {
  //   title: "Enterprise Security",
  //   description: "Bank-level encryption and data protection to keep your customer interactions safe and private.",
  //   icon: Shield,
  //   color: "bg-red-500/10 text-red-500",
  // },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/30 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 radial-gradient opacity-20" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 radial-gradient opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full uppercase">
            Key Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need for <span className="text-gradient">AI Customer Support</span>
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Comprehensive tools to automate support, increase sales, and delight your customers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-background rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.color} mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-foreground/80">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
