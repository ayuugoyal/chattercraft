"use client"
import React from 'react'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "@/components/ui/animated-modal"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { AgentFormValues, createAgent } from '@/lib/actions/agent-actions'

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  slug: z
    .string()
    .min(2, {
      message: "Slug must be at least 2 characters.",
    })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens.",
    }),
  systemPrompt: z.string().min(10, {
    message: "System prompt must be at least 10 characters.",
  }),
  modelProvider: z.enum(["gemini", "anthropic", "cohere"]),
})

// Function to generate a random string of specified length
function generateRandomString(length = 6) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function AgentPopUp() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      systemPrompt: "You are a helpful AI assistant that answers questions about our products and services.",
      modelProvider: "gemini",
    },
  })

  // Generate unique slug when name changes
  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'name' && value.name) {
        const baseSlug = value.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
        const uniqueSlug = `${baseSlug}-${generateRandomString()}`;
        form.setValue('slug', uniqueSlug);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      console.log("Form values:", values)
      const result = await createAgent(values as AgentFormValues)
      console.log("Result:", result)

      if (result?.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else if (result?.success) {
        toast({
          title: "Agent created",
          description: `Your agent "${values.name}" has been created successfully.`,
        })
        router.push(`/dashboard/agents/${result.details[0].id}`)
        router.refresh()
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to create agent. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreate = () => {
    if (formRef.current) {
      formRef.current.requestSubmit()
    }
  }

  return (
    <div>
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            + Create Agent
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            🤖
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <Form {...form}>
              <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Create New Agent</h1>
                  <p className="text-muted-foreground">Create a new AI chatbot agent that you can embed on your website.</p>
                </div>
                <div className="max-w-2xl">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Customer Support Bot" {...field} />
                        </FormControl>
                        <FormDescription>A friendly name for your chatbot.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Hidden slug field - not displayed but still part of the form */}
                  <input type="hidden" {...form.register("slug")} />
                  <FormField
                    control={form.control}
                    name="systemPrompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>System Prompt</FormLabel>
                        <FormControl>
                          <Textarea placeholder="You are a helpful AI assistant..." className="min-h-32" {...field} />
                        </FormControl>
                        <FormDescription>Instructions that define how your chatbot behaves.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </ModalContent>
          <ModalFooter className="gap-4">
            <button
              className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28"
              onClick={handleCreate}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create"}
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  )
}