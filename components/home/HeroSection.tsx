import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRightIcon } from 'lucide-react';
import HeroVideoDialog from "../magicui/hero-video-dialog";
import { BorderBeam } from "../magicui/border-beam";
import { useClerk } from "@clerk/nextjs"
import Link from "next/link";

export default function HeroSection() {
  const { isSignedIn } = useClerk();
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
              AI-Powered Chat Widget SaaS
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
            className="text-sm md:text-xl mb-8 text-foreground/80 max-w-xl sm:max-w-3xl mx-auto"
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
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
              <Button size="sm" className="">
                {isSignedIn ? "Go to Dashboard" : "Get Started Free"}
                <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

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
            thumbnailSrc="/thumbnail2.png"
            thumbnailAlt="Hero Video"
          />
          <HeroVideoDialog
            className="hidden dark:block"
            animationStyle="top-in-bottom-out"
            videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
            thumbnailSrc="/thumbnail.png"
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
