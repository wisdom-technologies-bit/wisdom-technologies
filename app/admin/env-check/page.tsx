import { ProtectedRoute } from "../../components/ProtectedRoute"
import { EnvChecker } from "../../components/EnvChecker"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

export default function EnvCheckPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-12">
        <ProtectedRoute>
          <EnvChecker />
        </ProtectedRoute>
      </main>
      <Footer />
    </>
  )
}

