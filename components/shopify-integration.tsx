// "use client"

// import { useState } from "react"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { Button } from "@/components/ui/button"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Switch } from "@/components/ui/switch"
// import { toast } from "@/hooks/use-toast"
// import { Loader2 } from "lucide-react"

// const shopifyFormSchema = z.object({
//   shopDomain: z
//     .string()
//     .min(3, { message: "Shop domain must be at least 3 characters." })
//     .regex(/^[a-zA-Z0-9]([a-zA-Z0-9-])*[a-zA-Z0-9]$/, {
//       message: "Invalid shop domain format.",
//     }),
//   apiKey: z.string().min(5, { message: "API key is required." }),
//   apiSecretKey: z.string().min(5, { message: "API secret key is required." }),
//   accessToken: z.string().min(5, { message: "Access token is required." }),
//   enableProductRecommendations: z.boolean().default(true),
//   maxProductsToShow: z.coerce.number().int().min(1).max(10),
// })

// type ShopifyFormValues = z.infer<typeof shopifyFormSchema>

// export default function ShopifyIntegration({
//   agentId,
//   existingConfig,
// }: {
//   agentId: string
//   existingConfig?: any
// }) {
//   const [isTesting, setIsTesting] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [connectionStatus, setConnectionStatus] = useState<"untested" | "success" | "failed">("untested")

//   const form = useForm<ShopifyFormValues>({
//     resolver: zodResolver(shopifyFormSchema),
//     defaultValues: {
//       shopDomain: existingConfig?.shopDomain || "",
//       apiKey: existingConfig?.apiKey || "",
//       apiSecretKey: existingConfig?.apiSecretKey || "",
//       accessToken: existingConfig?.accessToken || "",
//       enableProductRecommendations: existingConfig?.enableProductRecommendations ?? true,
//       maxProductsToShow: existingConfig?.maxProductsToShow || 3,
//     },
//   })

//   async function testConnection(values: ShopifyFormValues) {
//     setIsTesting(true)
//     setConnectionStatus("untested")

//     try {
//       const response = await fetch("/api/integrations/shopify/test", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       })

//       if (!response.ok) {
//         const error = await response.json()
//         throw new Error(error.message || "Failed to connect to Shopify")
//       }

//       setConnectionStatus("success")
//       toast({
//         title: "Connection successful",
//         description: "Successfully connected to your Shopify store.",
//       })
//     } catch (error) {
//       console.error("Error testing Shopify connection:", error)
//       setConnectionStatus("failed")
//       toast({
//         title: "Connection failed",
//         description: error instanceof Error ? error.message : "Failed to connect to Shopify",
//         variant: "destructive",
//       })
//     } finally {
//       setIsTesting(false)
//     }
//   }

//   async function onSubmit(values: ShopifyFormValues) {
//     setIsSubmitting(true)

//     try {
//       const response = await fetch(`/api/agents/${agentId}/integrations/shopify`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       })

//       if (!response.ok) {
//         const error = await response.json()
//         throw new Error(error.message || "Failed to save Shopify configuration")
//       }

//       toast({
//         title: "Settings saved",
//         description: "Your Shopify integration has been configured successfully.",
//       })
//     } catch (error) {
//       console.error("Error saving Shopify configuration:", error)
//       toast({
//         title: "Error",
//         description: error instanceof Error ? error.message : "Failed to save Shopify configuration",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         <FormField
//           control={form.control}
//           name="shopDomain"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Shop Domain</FormLabel>
//               <FormControl>
//                 <Input placeholder="your-store" {...field} />
//               </FormControl>
//               <FormDescription>Enter your Shopify store name without the .myshopify.com part</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="apiKey"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>API Key</FormLabel>
//               <FormControl>
//                 <Input placeholder="Shopify API Key" type="password" {...field} />
//               </FormControl>
//               <FormDescription>Found in your Shopify Partner Dashboard under Apps</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="apiSecretKey"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>API Secret Key</FormLabel>
//               <FormControl>
//                 <Input placeholder="Shopify API Secret Key" type="password" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="accessToken"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Access Token</FormLabel>
//               <FormControl>
//                 <Input placeholder="Shopify Access Token" type="password" {...field} />
//               </FormControl>
//               <FormDescription>Create a custom app in your Shopify admin to generate this token</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="enableProductRecommendations"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//               <div className="space-y-0.5">
//                 <FormLabel className="text-base">Product Recommendations</FormLabel>
//                 <FormDescription>Allow the AI to recommend products from your store during chat</FormDescription>
//               </div>
//               <FormControl>
//                 <Switch checked={field.value} onCheckedChange={field.onChange} />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="maxProductsToShow"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Max Products to Show</FormLabel>
//               <FormControl>
//                 <Input type="number" min={1} max={10} {...field} />
//               </FormControl>
//               <FormDescription>Maximum number of products to show in recommendations (1-10)</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <div className="flex gap-4">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={() => testConnection(form.getValues())}
//             disabled={isTesting || !form.formState.isValid}
//           >
//             {isTesting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Testing...
//               </>
//             ) : (
//               "Test Connection"
//             )}
//           </Button>

//           <Button type="submit" disabled={isSubmitting || connectionStatus === "failed"}>
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Saving...
//               </>
//             ) : (
//               "Save Configuration"
//             )}
//           </Button>
//         </div>

//         {connectionStatus === "success" && (
//           <div className="rounded-md bg-green-50 p-4 mt-4">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm font-medium text-green-800">Successfully connected to your Shopify store</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {connectionStatus === "failed" && (
//           <div className="rounded-md bg-red-50 p-4 mt-4">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm font-medium text-red-800">
//                   Failed to connect to your Shopify store. Please check your credentials.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </form>
//     </Form>
//   )
// }

import React from 'react'

const ShopifyIntegration = () => {
  return (
    <div>ShopifyIntegration</div>
  )
}

export default ShopifyIntegration
