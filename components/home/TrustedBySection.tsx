"use client"


import { motion } from "framer-motion";
import { useRef } from "react";

const brands = [
  { name: "Shopify", logo: "Shopify" },
  { name: "Amazon", logo: "Amazon" },
  { name: "Airbnb", logo: "Airbnb" },
  { name: "Microsoft", logo: "Microsoft" },
  { name: "Google", logo: "Google" },
  { name: "Spotify", logo: "Spotify" },
  { name: "Nike", logo: "Nike" },
  { name: "Apple", logo: "Apple" },
];

export default function TrustedBySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-16 overflow-hidden bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-lg font-semibold text-muted-foreground">
            Trusted by businesses worldwide
          </h2>
        </motion.div>

        <div className="relative" ref={containerRef}>
          <div className="w-full overflow-hidden">
            <motion.div
              className="flex items-center justify-center md:justify-start space-x-8 md:space-x-16"
              animate={{ x: [0, -1000] }}
              transition={{
                x: {
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                },
              }}
            >
              {/* First set of logos */}
              {brands.concat(brands).map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className="flex-shrink-0 h-8 md:h-10 filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                >
                  <div className="h-full flex items-center justify-center font-bold text-xl">
                    {brand.logo}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
