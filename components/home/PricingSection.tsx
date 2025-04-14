"use client";


import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Free",
    description: "Perfect for small businesses just getting started.",
    price: "0",
    features: [
      "100 AI conversations/month",
      "Basic chatbot customization",
      "Email support",
      "Standard response time",
      "Website integration"
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    description: "Ideal for growing businesses with active customer engagement.",
    price: "49",
    features: [
      "5,000 AI conversations/month",
      "Advanced customization options",
      "Priority email support",
      "Faster response speed",
      "All integrations included",
      "Customer insights dashboard",
      "Multilingual support"
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large businesses with complex support needs.",
    price: "Custom",
    features: [
      "Unlimited AI conversations",
      "Complete customization",
      "24/7 phone support",
      "Fastest response speed",
      "All integrations included",
      "Advanced analytics",
      "Multilingual support",
      "Dedicated account manager",
      "Custom training for your agents"
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full uppercase">
            Pricing Options
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Choose the plan that&apos;s right for your business, with no hidden fees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative rounded-2xl overflow-hidden border ${plan.popular ? 'border-primary' : 'border-border'
                }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-foreground/80 h-12">{plan.description}</p>
                <div className="mt-4 mb-6">
                  {plan.price === "Custom" ? (
                    <div className="text-3xl font-bold">{plan.price}</div>
                  ) : (
                    <div>
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-foreground/60">/month</span>
                    </div>
                  )}
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.popular ? '' : 'bg-muted-foreground hover:bg-muted-foreground/90'}`}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12 max-w-3xl mx-auto"
        >
          <p className="text-foreground/80">
            All plans include a 14-day free trial. No credit card required to start.
            Need a custom plan? <a href="#contact" className="text-primary underline">Contact our sales team</a>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
