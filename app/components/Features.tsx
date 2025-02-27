"use client"

import { Palette, TrendingUp, Globe, Video, CreditCard, DollarSign, BookOpen, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "./Cart"
import { useAuth } from "../contexts/AuthContext"
import { useRouter } from "next/navigation"

const features = [
  {
    icon: <Palette className="h-10 w-10 text-purple-500" />,
    title: "Graphic Design",
    description: "Captivating visual designs that tell your brand's story.",
    link: "/services/graphic-design",
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-green-500" />,
    title: "Affiliate Marketing",
    description: "Unlock passive income potential through strategic partnerships.",
    link: "/services/affiliate-marketing",
  },
  {
    icon: <Globe className="h-10 w-10 text-blue-500" />,
    title: "Web Design",
    description: "Create stunning, functional websites that drive results.",
    link: "/services/web-design",
  },
  {
    icon: <Video className="h-10 w-10 text-red-500" />,
    title: "Video Editing",
    description: "Transform raw footage into compelling visual stories.",
    link: "/services/video-editing",
  },
  {
    icon: <CreditCard className="h-10 w-10 text-yellow-500" />,
    title: "Remita Payments",
    description: "Streamline your payment processes with Remita solutions.",
    link: "/services/remita-payments",
  },
  {
    icon: <DollarSign className="h-10 w-10 text-green-500" />,
    title: "Content Monetization",
    description: "Maximize revenue from your content across multiple channels.",
    link: "/services/content-monetization",
  },
  {
    icon: <BookOpen className="h-10 w-10 text-indigo-500" />,
    title: "E-Pins & Educational Services",
    description: "Secure access to educational exams with instant e-pins.",
    link: "/services/e-pins-educational-services",
  },
]

export default function Features() {
  const { addToCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const handleAddToCart = (service: string, price: number) => {
    if (user) {
      addToCart({ name: service, price, quantity: 1 })
    } else {
      router.push("/account")
    }
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <Link href={feature.link} className="text-blue-500 hover:underline block mb-2">
                Learn more
              </Link>
              {feature.title === "E-Pins & Educational Services" && (
                <div className="space-y-2 mt-4">
                  <Button onClick={() => handleAddToCart("WAEC E-Pin", 6000)} className="w-full">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add WAEC E-Pin (₦6,000)
                  </Button>
                  <Button onClick={() => handleAddToCart("NECO E-Pin", 5000)} className="w-full">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add NECO E-Pin (₦5,000)
                  </Button>
                  <Button onClick={() => handleAddToCart("NABTEB E-Pin", 4000)} className="w-full">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add NABTEB E-Pin (₦4,000)
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

