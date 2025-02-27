import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { AuthProvider } from "./contexts/AuthContext"
import { CartProvider } from "./components/Cart"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Wisdom Technologies",
  description: "Empowering businesses with innovative technological solutions",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.dev'
}

function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}



import './globals.css'