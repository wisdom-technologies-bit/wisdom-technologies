import { NextResponse } from 'next/server'

// This is a mock database. In a real application, you'd use a proper database.
let users = []

export async function POST(request: Request) {
  const { name, email, password } = await request.json()

  if (users.some(u => u.email === email)) {
    return NextResponse.json({ success: false, message: 'Email already in use' })
  }

  const newUser = { id: String(users.length + 1), name, email, password }
  users.push(newUser)

  return NextResponse.json({ success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email } })
}

