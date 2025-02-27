"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export function EnvChecker() {
  const [envStatus, setEnvStatus] = useState<{
    hasEdgeDBInstance: boolean
    hasEdgeDBSecretKey: boolean
    hasBlobToken: boolean
  } | null>(null)

  useEffect(() => {
    fetch("/api/check-env")
      .then((res) => res.json())
      .then(setEnvStatus)
      .catch(console.error)
  }, [])

  if (!envStatus) return null

  return (
    <div className="space-y-4 max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Environment Variables Status</h2>

      {/* EdgeDB Instance */}
      <Alert variant={envStatus.hasEdgeDBInstance ? "default" : "destructive"}>
        {envStatus.hasEdgeDBInstance ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
        <AlertTitle>EDGEDB_INSTANCE</AlertTitle>
        <AlertDescription>
          {envStatus.hasEdgeDBInstance
            ? "✓ Properly configured"
            : "⚠️ Not configured - Please add this in your Vercel project settings"}
        </AlertDescription>
      </Alert>

      {/* EdgeDB Secret Key */}
      <Alert variant={envStatus.hasEdgeDBSecretKey ? "default" : "destructive"}>
        {envStatus.hasEdgeDBSecretKey ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
        <AlertTitle>EDGEDB_SECRET_KEY</AlertTitle>
        <AlertDescription>
          {envStatus.hasEdgeDBSecretKey
            ? "✓ Properly configured"
            : "⚠️ Not configured - Please add this in your Vercel project settings"}
        </AlertDescription>
      </Alert>

      {/* Blob Token */}
      <Alert variant={envStatus.hasBlobToken ? "default" : "destructive"}>
        {envStatus.hasBlobToken ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
        <AlertTitle>BLOB_READ_WRITE_TOKEN</AlertTitle>
        <AlertDescription>
          {envStatus.hasBlobToken
            ? "✓ Properly configured"
            : "⚠️ Not configured - Please add this in your Vercel project settings"}
        </AlertDescription>
      </Alert>

      {!envStatus.hasEdgeDBInstance || !envStatus.hasEdgeDBSecretKey || !envStatus.hasBlobToken ? (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h3 className="font-semibold text-yellow-800">How to set environment variables:</h3>
          <ol className="list-decimal ml-4 mt-2 text-yellow-700">
            <li>Go to your Vercel project dashboard</li>
            <li>Click on "Settings"</li>
            <li>Navigate to "Environment Variables"</li>
            <li>
              Add the missing variables:
              <ul className="list-disc ml-4 mt-1">
                {!envStatus.hasEdgeDBInstance && <li>EDGEDB_INSTANCE</li>}
                {!envStatus.hasEdgeDBSecretKey && <li>EDGEDB_SECRET_KEY</li>}
                {!envStatus.hasBlobToken && <li>BLOB_READ_WRITE_TOKEN</li>}
              </ul>
            </li>
            <li>Redeploy your application</li>
          </ol>
        </div>
      ) : null}
    </div>
  )
}

