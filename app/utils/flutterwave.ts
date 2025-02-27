import type { FlutterwaveConfig } from "flutterwave-react-v3"

export const flutterwaveConfig: FlutterwaveConfig = {
  public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "",
  tx_ref: Date.now().toString(),
  amount: 0,
  currency: "NGN",
  payment_options: "card,mobilemoney,ussd",
  customer: {
    email: "",
    phone_number: "",
    name: "",
  },
  customizations: {
    title: "Wisdom Technologies Payment",
    description: "Payment for products/services",
    logo: "https://your-logo-url.com/logo.png",
  },
}

export const initializePayment = async (amount: number, email: string, name: string, phone_number: string) => {
  const config = {
    ...flutterwaveConfig,
    amount,
    customer: {
      email,
      phone_number,
      name,
    },
  }

  return config
}

export const verifyPayment = async (transactionId: string) => {
  try {
    const response = await fetch("/api/verify-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transactionId }),
    })

    if (!response.ok) {
      throw new Error("Payment verification failed")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error verifying payment:", error)
    throw error
  }
}

