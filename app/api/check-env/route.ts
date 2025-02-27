import { NextResponse } from "next/server"

export async function GET() {
  const envVars = {
    hasEdgeDBInstance: !!process.env.EDGEDB_INSTANCE,
    hasEdgeDBSecretKey: !!process.env.EDGEDB_SECRET_KEY,
    hasBlobToken: !!process.env.BLOB_READ_WRITE_TOKEN,
  }

  return NextResponse.json(envVars)
}

