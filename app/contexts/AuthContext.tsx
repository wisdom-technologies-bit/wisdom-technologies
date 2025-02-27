"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect, useCallback } from "react"
import {
  getUserByEmail,
  addUser,
  updateUser as updateServerUser,
  isEmailRegistered as checkEmailRegistered,
} from "../actions/serverActions"
import type { ServerUser } from "../utils/serverSimulation"

interface User {
  id: string
  name: string
  email: string
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  updateUser: (updates: Partial<User>) => Promise<void>
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message: string }>
  getAllUsers: () => Promise<User[]>
  syncUserData: () => Promise<void>
  isEmailRegistered: (email: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const syncUserData = useCallback(async () => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      const serverUser = await getUserByEmail(parsedUser.email)
      if (serverUser) {
        const { password, ...userWithoutPassword } = serverUser
        setUser(userWithoutPassword)
        localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
      }
    }
  }, [])

  const getAllUsers = useCallback(async () => {
    // This function should be implemented in serverActions.ts
    // For now, we'll return an empty array
    return []
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try {
      const user = await getUserByEmail(email)

      if (user && user.password === password) {
        const { password: _, ...userWithoutPassword } = user
        setUser(userWithoutPassword)
        localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
        console.log("Login successful for:", email)
        return { success: true, message: "Login successful" }
      }

      console.log("Login failed for:", email)
      return { success: false, message: "Invalid email or password" }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "An error occurred during login" }
    }
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
      const isRegistered = await checkEmailRegistered(email)
      if (isRegistered) {
        return { success: false, message: "Email already registered" }
      }

      const newUser: ServerUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        isAdmin: false,
      }
      await addUser(newUser)

      const { password: _, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
      return { success: true, message: "Registration successful" }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, message: "An error occurred during registration" }
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("currentUser")
  }, [])

  const updateUser = useCallback(
    async (updates: Partial<User>) => {
      if (user) {
        const updatedUser = { ...user, ...updates }
        setUser(updatedUser)
        localStorage.setItem("currentUser", JSON.stringify(updatedUser))

        const serverUser = await getUserByEmail(user.email)
        if (serverUser) {
          await updateServerUser({ ...serverUser, ...updates })
        }
      }
    },
    [user],
  )

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      if (!user) {
        return { success: false, message: "User not logged in" }
      }

      const serverUser = await getUserByEmail(user.email)
      if (!serverUser || serverUser.password !== currentPassword) {
        return { success: false, message: "Current password is incorrect" }
      }

      serverUser.password = newPassword
      await updateServerUser(serverUser)
      return { success: true, message: "Password changed successfully" }
    },
    [user],
  )

  const isEmailRegistered = useCallback(async (email: string) => {
    return checkEmailRegistered(email)
  }, [])

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    syncUserData,
    changePassword,
    getAllUsers,
    isEmailRegistered,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

