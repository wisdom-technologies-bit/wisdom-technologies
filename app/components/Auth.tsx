"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "../contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Greeting } from "./Greeting"

export function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showGreeting, setShowGreeting] = useState(false)
  const { login, register, syncUserData, isEmailRegistered } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      if (isLogin) {
        const result = await login(email, password)
        if (result.success) {
          await syncUserData()
          setShowGreeting(true)
          setTimeout(() => {
            setShowGreeting(false)
            if (email === "wisdommeremeze@gmail.com") {
              router.push("/admin/dashboard")
            } else {
              router.push("/dashboard")
            }
          }, 2000)
        } else {
          setError(result.message)
        }
      } else {
        const emailAlreadyRegistered = await isEmailRegistered(email)
        if (emailAlreadyRegistered) {
          setError("Email already registered")
          return
        }
        const result = await register(name, email, password)
        if (result.success) {
          await syncUserData()
          setShowGreeting(true)
          setTimeout(() => {
            setShowGreeting(false)
            router.push("/dashboard")
          }, 2000)
        } else {
          setError(result.message)
        }
      }
    } catch (error) {
      console.error("Authentication error:", error)
      setError("An unexpected error occurred. Please try again.")
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {showGreeting && <Greeting name={isLogin ? email.split("@")[0] : name} />}
      <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          {isLogin ? "Login" : "Register"}
        </Button>
      </form>
      <p className="mt-4 text-center">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500 hover:underline">
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  )
}

