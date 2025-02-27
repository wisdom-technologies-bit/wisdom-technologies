import { NextResponse } from 'next/server'

// This is a mock database. In a real application, you'd use a proper database.
let users = []
let loginAttempts = {}

export async function POST(request: Request) {
  const { email, password } = await request.json()
  const ip = request.headers.get('x-forwarded-for') || 'unknown'

  // Check if the account is restricted
  if (loginAttempts[email] && loginAttempts[email].restricted) {
    const now = new Date()
    if (now.getTime() - loginAttempts[email].restrictedAt.getTime() < 24 * 60 * 60 * 1000) {
      return NextResponse.json({ success: false, message: 'Account is restricted. Please try again after 24 hours.' })
    } else {
      // Reset restriction after 24 hours
      delete loginAttempts[email]
    }
  }

  const user = users.find(u => u.email === email && u.password === password)

  if (user) {
    // Successful login
    loginAttempts[email] = { count: 0, ips: new Set() }
    return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email } })
  } else {
    // Failed login attempt
    if (!loginAttempts[email]) {
      loginAttempts[email] = { count: 0, ips: new Set() }
    }
    loginAttempts[email].count++
    loginAttempts[email].ips.add(ip)

    if (loginAttempts[email].ips.size > 4) {
      loginAttempts[email].restricted = true
      loginAttempts[email].restrictedAt = new Date()
      return NextResponse.json({ success: false, message: 'Account is restricted due to multiple login attempts from different IP addresses. Please try again after 24 hours.' })
    }

    return NextResponse.json({ success: false, message: 'Invalid email or password. Please create a new account.' })
  }
}

