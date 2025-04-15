"use client"

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";

export default function CtaSection() {
  const { isSignedIn } = useClerk();
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 radial-gradient opacity-60" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 shadow-xl text-center"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Customer Experience?
            </h2>
            <p className="text-lg mb-8 text-foreground/80">
              Create your AI agent right now
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                <Button size="sm" className="">
                  {isSignedIn ? "Go to Dashboard" : "Get Started Free"}
                  <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
