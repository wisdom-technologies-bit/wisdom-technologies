import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { transactionId } = await request.json()

  try {
    const response = await fetch(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error("Payment verification failed")
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 })
  }
}

