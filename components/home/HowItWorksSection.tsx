"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Code, Bot, ArrowRight } from "lucide-react"

const steps = [
  {
    title: "Create Your AI Agent",
    description:
      "Set up your AI assistant in minutes with our intuitive dashboard. Customize its knowledge base and personality.",
    icon: Bot,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Copy & Paste One Line",
    description: "Add a single line of code to your website to integrate your AI assistant seamlessly.",
    icon: Code,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Start Chatting with Visitors",
    description: "Watch as your AI assistant engages with visitors, answers questions and boosts conversions.",
    icon: CheckCircle2,
    color: "from-green-500 to-green-600",
  },
]

export default function HowItWorksSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full uppercase">
            Simple Setup
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How ChattercraftAI Works</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Get your AI assistant up and running in three simple steps.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div key={index} className="relative" variants={itemVariants}>
              <div className="relative h-full bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${step.color} mb-4`}
                >
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-foreground/80">{step.description}</p>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 ml-8 text-primary/50" />
                  </div>
                )}
              </div>

              <motion.div
                className="absolute -z-10 inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.4, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
