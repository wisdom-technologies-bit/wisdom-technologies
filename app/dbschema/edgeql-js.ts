import { createClient } from "edgedb"
import { e } from "edgedb"

const client = createClient({
  dsn: process.env.EDGEDB_DSN,
  tlsSecurity: "insecure",
})

export default e

