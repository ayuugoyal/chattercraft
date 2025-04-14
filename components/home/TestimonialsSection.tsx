"use client"


import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "E-commerce Manager at StyleHub",
    quote: "Chatwise has revolutionized our customer support. Our response time dropped from 24 hours to instant, and we've seen a 30% increase in sales conversions.",
    avatar: "SJ",
    rating: 5,
  },
  {
    name: "Michael Chen",
    title: "CEO of TechGadgets",
    quote: "The AI is remarkably accurate at answering product questions. We've reduced support tickets by 65% and our team can focus on complex issues rather than repetitive questions.",
    avatar: "MC",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    title: "Marketing Director at FitnessPro",
    quote: "Implementation was incredibly easy. Just one line of code and we had an AI assistant handling customer inquiries 24/7. Definitely worth every penny.",
    avatar: "ER",
    rating: 5,
  },
  {
    name: "David Patel",
    title: "Operations Manager at HomeDecor",
    quote: "The product recommendation feature has been a game-changer. Customers love getting instant, personalized suggestions that actually match what they're looking for.",
    avatar: "DP",
    rating: 4,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Join hundreds of satisfied businesses that have transformed their customer support with Chatwise.
          </p>
        </motion.div>

        {/* Mobile Testimonial Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-2xl p-6 border border-border shadow-sm"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {testimonials[currentIndex].avatar}
                </div>
                <div>
                  <h3 className="font-bold">{testimonials[currentIndex].name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonials[currentIndex].title}</p>
                  <div className="flex mt-1">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
              <blockquote className="text-lg font-medium">
                &quot;{testimonials[currentIndex].quote}&quot;
              </blockquote>
            </motion.div>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-muted hover:bg-muted/80"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-muted hover:bg-muted/80"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Desktop Testimonials Grid */}
        <div className="hidden md:grid grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  <div className="flex mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
              <blockquote className="text-lg font-medium">
                &quot;{testimonial.quote}&quot;
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
