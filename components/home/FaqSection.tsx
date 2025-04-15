"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

const faqs = [
  {
    question: "How does ChattercraftAI learn about my products and services?",
    answer:
      "ChattercraftAI can learn about your products and services by a prompt. You can manually this information through our dashboard.",
  },
  {
    question: "Is any coding knowledge required to implement ChattercraftAI?",
    answer:
      "No coding knowledge is required! For basic implementation, you simply copy and paste a single line of code into your website. We also offer no-code plugins for platforms like Shopify, WordPress, and Wix for even easier setup.",
  },
]

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full uppercase">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Everything you need to know about ChattercraftAI. Can&apos;t find the answer you&apos;re looking for?
            Contact <Link href={"https://ayuugoyal.tech/"} className="text-blue-400 hover:underline">@ayuugoyal</Link>
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFaq(index)}
                className={`w-full text-left p-5 flex justify-between items-center rounded-lg ${activeIndex === index ? "bg-muted/70" : "bg-card hover:bg-muted/50"} transition-colors border border-border`}
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${activeIndex === index ? "transform rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 bg-muted/30 rounded-b-lg border-x border-b border-border">
                      <p className="text-foreground/80">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
