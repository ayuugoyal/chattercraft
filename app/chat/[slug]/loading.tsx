import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <>
      <div>
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="animate-spin text-primary" />
          <span className="ml-2 text-primary">Loading...</span>
        </div>
      </div>
    </>
  )
}
