"use server"

import { serverStorage, type ServerUser } from "../utils/serverSimulation"

export async function getUsers() {
  return await serverStorage.getUsers()
}

export async function addUser(user: ServerUser) {
  await serverStorage.addUser(user)
}

export async function updateUser(user: ServerUser) {
  await serverStorage.updateUser(user)
}

export async function getUserByEmail(email: string) {
  return await serverStorage.getUserByEmail(email)
}

export async function isEmailRegistered(email: string) {
  return await serverStorage.isEmailRegistered(email)
}

export async function addFormSubmission(submission: any) {
  await serverStorage.addFormSubmission(submission)
}

export async function getFormSubmissions() {
  return await serverStorage.getFormSubmissions()
}

export async function initializeAdmin() {
  const adminUser = await serverStorage.getUserByEmail("wisdommeremeze@gmail.com")
  if (!adminUser) {
    await serverStorage.addUser({
      id: "admin",
      name: "Admin",
      email: "wisdommeremeze@gmail.com",
      password: "1a2B3c$d",
      isAdmin: true,
    })
    console.log("Admin user initialized successfully")
  } else {
    console.log("Admin user already exists")
  }
}

