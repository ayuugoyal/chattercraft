
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRightIcon, Play } from 'lucide-react';
import HeroVideoDialog from "../magicui/hero-video-dialog";
import { BorderBeam } from "../magicui/border-beam";

export default function HeroSection() {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full radial-gradient opacity-30" />

        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/20 dark:bg-primary/10"
              style={{
                width: Math.random() * 40 + 10,
                height: Math.random() * 40 + 10,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * -100 - 50],
                opacity: [0, Math.random() * 0.5 + 0.1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Wave Effect */}
        <div className="absolute bottom-0 left-0 w-[200%] h-48 bg-gradient-wave from-primary/10 via-accent/10 to-primary/10 animate-wave" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full uppercase">
              AI-Powered Customer Support
            </span>
          </motion.div>

          <motion.h1
            className="text-2xl md:text-3xl lg:text-5xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span>Supercharge Your Site with </span>
            <span className="text-gradient">AI Conversations</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-foreground/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            AI agents that answer questions, suggest products, and escalate support — all without lifting a finger.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" className="text-base py-6 px-8 group">
              Get Started Free
              <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="text-base py-6 px-8">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </motion.div>
        </div>
        {/* 
        <motion.div
          className="mt-16 relative max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.5,
            type: "spring",
            stiffness: 100
          }}
        >
          <div className="bg-gradient-to-tr from-chatwise-blue/20 via-chatwise-purple/20 to-transparent p-1 rounded-2xl shadow-xl">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl overflow-hidden border border-border">
              <div className="aspect-[16/9] relative">
                <div className="absolute inset-0 flex flex-col">
                  <div className="bg-muted/80 p-4 border-b border-border flex items-center">
                    <div className="w-3 h-3 rounded-full bg-destructive mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-4"></div>
                    <div className="flex-1 text-center text-sm font-medium">Chatwise Demo</div>
                  </div>
                  <div className="flex-1 p-4 overflow-hidden">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                          <span className="text-xs font-bold">AI</span>
                        </div>
                        <div className="bg-muted/50 rounded-2xl p-3 max-w-[80%]">
                          <p className="text-sm">Hi there! 👋 Welcome to Chatwise. How can I help you today?</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 flex-row-reverse">
                        <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent">
                          <span className="text-xs font-bold">U</span>
                        </div>
                        <div className="bg-accent/20 rounded-2xl p-3 max-w-[80%]">
                          <p className="text-sm">Do you have any wireless headphones in stock?</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                          <span className="text-xs font-bold">AI</span>
                        </div>
                        <div className="bg-muted/50 rounded-2xl p-3 max-w-[80%]">
                          <p className="text-sm">Yes, we have several wireless headphone options in stock! Our most popular models are:</p>
                          <ul className="list-disc list-inside mt-2 text-xs space-y-1">
                            <li>SoundMax Pro (Noise Cancelling) - $129.99</li>
                            <li>AudioFlex Wireless Buds - $89.99</li>
                            <li>BeatSync Studio - $199.99</li>
                          </ul>
                          <p className="text-sm mt-2">Would you like more details about any of these models?</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                      <div className="flex-1 bg-muted/50 rounded-full px-4 py-2 text-sm text-muted-foreground">
                        Type your message...
                      </div>
                      <Button size="sm" className="rounded-full px-3">
                        <ArrowRightIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-primary"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-accent"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, delay: 0.5, repeat: Infinity }}
          />
        </motion.div> */}

        <motion.div
          className="mt-16 relative rounded-md max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.5,
            type: "spring",
            stiffness: 100
          }}
        >
          <HeroVideoDialog
            className="block dark:hidden"
            animationStyle="top-in-bottom-out"
            videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
            thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
            thumbnailAlt="Hero Video"
          />
          <HeroVideoDialog
            className="hidden dark:block"
            animationStyle="top-in-bottom-out"
            videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
            thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
            thumbnailAlt="Hero Video"
          />
          <BorderBeam
            duration={10}
            delay={3}
            size={400}
            className="from-transparent via-blue-500 to-transparent"
          />

        </motion.div>
      </div>
    </section>
  );
}
