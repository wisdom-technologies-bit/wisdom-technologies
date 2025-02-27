import { motion } from "framer-motion"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Features from "./components/Features"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <>
      <Header />
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Hero />
        <Features />
      </motion.main>
      <Footer />
    </>
  )
}

