"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div), { ssr: false })
const MotionH1 = dynamic(() => import("framer-motion").then((mod) => mod.motion.h1), { ssr: false })
const MotionP = dynamic(() => import("framer-motion").then((mod) => mod.motion.p), { ssr: false })

export default function Hero() {
  const router = useRouter()

  return (
    <section className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <MotionH1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          WISDOM TECHNOLOGIES
        </MotionH1>
        <MotionP
          className="text-xl mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Empowering Your Digital Future
        </MotionP>
        <MotionDiv
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button size="lg" onClick={() => router.push("/about")}>
            Learn More
          </Button>
        </MotionDiv>
      </div>
    </section>
  )
}

