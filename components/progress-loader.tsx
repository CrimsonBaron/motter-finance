"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

export default function ProgressLoader() {
  const router = useRouter();
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer1 = setTimeout(() => setProgress(50), 1000); 
    const timer2 = setTimeout(() => setProgress(100), 2000);
    const timer3 = setTimeout(() => router.push("/login"), 2100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [router])

  return <Progress value={progress} className="w-[60%]" />
}
