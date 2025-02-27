export interface ServerUser {
  id: string
  name: string
  email: string
  password: string
  isAdmin: boolean
}

export interface FormSubmission {
  id: string
  userId: string
  service: string
  details: Record<string, string>
  timestamp: number
}

const getLocalStorage = () => {
  if (typeof window !== "undefined") {
    return window.localStorage
  }
  return null
}

export const serverStorage = {
  async getUsers(): Promise<ServerUser[]> {
    const storage = getLocalStorage()
    if (!storage) return []
    const users = JSON.parse(storage.getItem("users") || "[]")
    return users
  },

  async addUser(user: ServerUser): Promise<void> {
    const storage = getLocalStorage()
    if (!storage) return
    const users = await this.getUsers()
    users.push(user)
    storage.setItem("users", JSON.stringify(users))
  },

  async updateUser(updatedUser: ServerUser): Promise<void> {
    const storage = getLocalStorage()
    if (!storage) return
    const users = await this.getUsers()
    const index = users.findIndex((u) => u.id === updatedUser.id)
    if (index !== -1) {
      users[index] = updatedUser
      storage.setItem("users", JSON.stringify(users))
    }
  },

  async getUserByEmail(email: string): Promise<ServerUser | null> {
    const users = await this.getUsers()
    return users.find((u) => u.email === email) || null
  },

  async isEmailRegistered(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email)
    return user !== null
  },

  async addFormSubmission(submission: FormSubmission): Promise<void> {
    const storage = getLocalStorage()
    if (!storage) return
    const submissions = JSON.parse(storage.getItem("formSubmissions") || "[]")
    submissions.push(submission)
    storage.setItem("formSubmissions", JSON.stringify(submissions))
  },

  async getFormSubmissions(): Promise<FormSubmission[]> {
    const storage = getLocalStorage()
    if (!storage) return []
    return JSON.parse(storage.getItem("formSubmissions") || "[]")
  },
}

export const initializeAdminUser = async () => {
  const adminUser = await serverStorage.getUserByEmail("wisdommeremeze@gmail.com")
  if (!adminUser) {
    await serverStorage.addUser({
      id: "admin",
      name: "Admin",
      email: "wisdommeremeze@gmail.com",
      password: "1a2B3c$d",
      isAdmin: true,
    })
  }
}

