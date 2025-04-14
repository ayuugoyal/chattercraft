"use client";

import { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SendIcon, Mic, PauseCircle, Bot } from "lucide-react";

const demoMessages = [
  {
    role: 'bot',
    content: "Hello! I'm your Chatwise AI assistant. How can I help you today?",
    delay: 0,
  },
  {
    role: 'user',
    content: "Do you have the new AirPods Pro in stock?",
    delay: 0.5,
  },
  {
    role: 'bot',
    content: "Yes, we currently have the AirPods Pro (2nd generation) in stock! They're priced at $249 and feature active noise cancellation, transparency mode, and spatial audio. Would you like to know more about their features or are you interested in purchasing them?",
    delay: 1,
  },
  {
    role: 'user',
    content: "What colors are available?",
    delay: 1.5,
  },
  {
    role: 'bot',
    content: "The AirPods Pro come in white only. The case has a glossy finish and supports both MagSafe and wireless charging. Would you like to add a pair to your cart?",
    delay: 2,
  }
];

export default function ChatDemoSection() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState(demoMessages);

  const handleSend = () => {
    if (!message.trim()) return;

    // Add user message
    setChatMessages([...chatMessages, {
      role: 'user',
      content: message,
      delay: 0,
    }]);

    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        role: 'bot',
        content: "Thank you for your message! This is a demonstration of how Chatwise responds to customer inquiries in real-time. In a real implementation, our AI would provide a helpful, relevant response to your specific question.",
        delay: 0,
      }]);
    }, 1000);
  };

  return (
    <section id="demo" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full uppercase">
            Interactive Demo
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Try Chatwise In Action
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Experience how our AI assistant handles customer inquiries in real-time.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              type: "spring",
              stiffness: 100
            }}
            className="bg-card rounded-2xl overflow-hidden border border-border shadow-lg"
          >
            {/* Chat Header */}
            <div className="bg-muted/50 px-6 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Chatwise Demo</h3>
                  <p className="text-xs text-muted-foreground">Online • Powered by AI</p>
                </div>
              </div>
              <div>
                <Button variant="ghost" size="sm">
                  <PauseCircle className="h-4 w-4 mr-2" />
                  End Demo
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6">
              <div className="flex flex-col space-y-4">
                {chatMessages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: msg.delay }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-2xl px-4 py-3`}>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="px-6 py-4 border-t border-border">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    className="w-full px-4 py-2 rounded-full bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                    <Mic className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
                <Button onClick={handleSend} className="rounded-full">
                  <SendIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-muted-foreground">
              This is a demo of the Chatwise interface. In a real implementation, our AI would provide responses tailored to your specific business and products.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
