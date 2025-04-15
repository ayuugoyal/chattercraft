"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ChatWidgetPreview from "@/components/chat-widget-preview"

const uiFormSchema = z.object({
  // Colors
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code",
  }),
  secondaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code",
  }),
  backgroundColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code",
  }),
  textColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code",
  }),

  // Layout
  buttonPosition: z.string(),
  buttonSize: z.coerce.number().min(40).max(80),
  widgetWidth: z.coerce.number().min(300).max(500),
  widgetHeight: z.coerce.number().min(400).max(700),
  borderRadius: z.coerce.number().min(0).max(20),

  // Content
  welcomeMessage: z.string().min(1, { message: "Welcome message is required" }),
  buttonIcon: z.string().min(1, { message: "Button icon is required" }),
  headerTitle: z.string().min(1, { message: "Header title is required" }),

  // Features
  showAgentAvatar: z.boolean(),
  showTimestamp: z.boolean(),
  showTypingIndicator: z.boolean(),
  enableDarkMode: z.boolean(),
  allowAttachments: z.boolean()
})

type UIFormValues = z.infer<typeof uiFormSchema>

const defaultValues: UIFormValues = {
  primaryColor: "#0070f3",
  secondaryColor: "#f5f5f5",
  backgroundColor: "#ffffff",
  textColor: "#333333",
  buttonPosition: "bottom-right",
  buttonSize: 60,
  widgetWidth: 380,
  widgetHeight: 600,
  borderRadius: 8,
  welcomeMessage: "Hello! How can I help you today?",
  buttonIcon: "message",
  headerTitle: "Chat Support",
  showAgentAvatar: true,
  showTimestamp: true,
  showTypingIndicator: true,
  enableDarkMode: false,
  allowAttachments: false,
}

export default function UICustomization({
  agentId,
  existingConfig,
}: {
  agentId: string
  existingConfig?: UIFormValues
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewConfig, setPreviewConfig] = useState<UIFormValues>(existingConfig || defaultValues)

  const form = useForm<UIFormValues>({
    resolver: zodResolver(uiFormSchema),
    defaultValues: existingConfig || defaultValues,
  })

  const updatePreview = (values: Partial<UIFormValues>) => {
    setPreviewConfig((current) => ({ ...current, ...values }))
  }

  async function onSubmit(values: UIFormValues) {
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/agents/${agentId}/ui-config`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to save UI configuration")
      }

      toast({
        title: "Settings saved",
        description: "Your chat widget appearance has been updated successfully.",
      })
    } catch (error) {
      console.error("Error saving UI configuration:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save UI configuration",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="colors" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="primaryColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Color</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              updatePreview({ primaryColor: e.target.value })
                            }}
                          />
                        </FormControl>
                        <div className="w-10 h-10 rounded border" style={{ backgroundColor: field.value }} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="secondaryColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secondary Color</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              updatePreview({ secondaryColor: e.target.value })
                            }}
                          />
                        </FormControl>
                        <div className="w-10 h-10 rounded border" style={{ backgroundColor: field.value }} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="backgroundColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Background Color</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              updatePreview({ backgroundColor: e.target.value })
                            }}
                          />
                        </FormControl>
                        <div className="w-10 h-10 rounded border" style={{ backgroundColor: field.value }} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="textColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Text Color</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              updatePreview({ textColor: e.target.value })
                            }}
                          />
                        </FormControl>
                        <div className="w-10 h-10 rounded border" style={{ backgroundColor: field.value }} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="layout" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="buttonPosition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Button Position</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          updatePreview({ buttonPosition: value as string })
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bottom-right">Bottom Right</SelectItem>
                          <SelectItem value="bottom-left">Bottom Left</SelectItem>
                          <SelectItem value="top-right">Top Right</SelectItem>
                          <SelectItem value="top-left">Top Left</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="buttonSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Button Size: {field.value}px</FormLabel>
                      <FormControl>
                        <Slider
                          min={40}
                          max={80}
                          step={1}
                          defaultValue={[field.value]}
                          onValueChange={(values) => {
                            field.onChange(values[0])
                            updatePreview({ buttonSize: values[0] })
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="widgetWidth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Widget Width: {field.value}px</FormLabel>
                      <FormControl>
                        <Slider
                          min={300}
                          max={500}
                          step={10}
                          defaultValue={[field.value]}
                          onValueChange={(values) => {
                            field.onChange(values[0])
                            updatePreview({ widgetWidth: values[0] })
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="widgetHeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Widget Height: {field.value}px</FormLabel>
                      <FormControl>
                        <Slider
                          min={400}
                          max={700}
                          step={10}
                          defaultValue={[field.value]}
                          onValueChange={(values) => {
                            field.onChange(values[0])
                            updatePreview({ widgetHeight: values[0] })
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="borderRadius"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Border Radius: {field.value}px</FormLabel>
                      <FormControl>
                        <Slider
                          min={0}
                          max={20}
                          step={1}
                          defaultValue={[field.value]}
                          onValueChange={(values) => {
                            field.onChange(values[0])
                            updatePreview({ borderRadius: values[0] })
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="content" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="welcomeMessage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Welcome Message</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            updatePreview({ welcomeMessage: e.target.value })
                          }}
                        />
                      </FormControl>
                      <FormDescription>First message shown when a user opens the chat</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="buttonIcon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Button Icon</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          updatePreview({ buttonIcon: value as string })
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select icon" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="message">Message</SelectItem>
                          <SelectItem value="chat">Chat</SelectItem>
                          <SelectItem value="help">Help</SelectItem>
                          <SelectItem value="support">Support</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="headerTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Header Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            updatePreview({ headerTitle: e.target.value })
                          }}
                        />
                      </FormControl>
                      <FormDescription>Title displayed in the chat widget header</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="features" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="showAgentAvatar"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Show Agent Avatar</FormLabel>
                        <FormDescription>Display an avatar for the AI agent in the chat</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(value) => {
                            field.onChange(value)
                            updatePreview({ showAgentAvatar: value })
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="showTimestamp"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Show Timestamps</FormLabel>
                        <FormDescription>Display time for each message in the chat</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(value) => {
                            field.onChange(value)
                            updatePreview({ showTimestamp: value })
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="showTypingIndicator"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Show Typing Indicator</FormLabel>
                        <FormDescription>Display a typing animation when the AI is responding</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(value) => {
                            field.onChange(value)
                            updatePreview({ showTypingIndicator: value })
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="enableDarkMode"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Enable Dark Mode</FormLabel>
                        <FormDescription>Allow users to toggle between light and dark mode</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(value) => {
                            field.onChange(value)
                            updatePreview({ enableDarkMode: value })
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="allowAttachments"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Allow Attachments</FormLabel>
                        <FormDescription>Enable users to upload files during the chat</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(value) => {
                            field.onChange(value)
                            updatePreview({ allowAttachments: value })
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </Form>
      </div>

      <div className="sticky top-4">
        <div className="text-center mb-4">
          <h3 className="text-lg font-medium">Live Preview</h3>
          <p className="text-sm text-muted-foreground">See how your chat widget will look</p>
        </div>
        <ChatWidgetPreview config={previewConfig} />
      </div>
    </div>
  )
}
