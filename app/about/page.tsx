'use client'

import { useEffect, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion, useInView, useAnimation } from 'framer-motion'

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible')
    }
  }, [isInView, mainControls])

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      {children}
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-4xl font-bold mb-8 text-center text-gray-800"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Wisdom Technologies
          </motion.h1>
          
          <AnimatedSection>
            <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                At Wisdom Technologies, our mission is to provide cutting-edge, reliable, and innovative solutions that empower our clients to navigate the digital world with confidence. We aim to transform challenges into opportunities by utilizing advanced technology to solve real-world problems.
              </p>
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                Our vision is to be a global leader in providing next-generation digital solutions, helping businesses and individuals not only adapt to technological advancements but also leverage them to their advantage. We aim to revolutionize industries, reshape the way businesses operate, and provide unparalleled services that cater to the diverse needs of our clients.
              </p>
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Core Values</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Innovation: Embracing cutting-edge technologies and practices</li>
                <li>Integrity: Upholding the highest ethical standards in all our operations</li>
                <li>Customer-Centricity: Tailoring our services to meet unique client needs</li>
                <li>Excellence: Striving for the highest quality in everything we do</li>
                <li>Collaboration: Fostering teamwork and partnerships for optimal results</li>
                <li>Sustainability: Promoting environmentally responsible practices</li>
              </ul>
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Our Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 text-gray-700">Graphic Design</h3>
                  <p className="text-gray-600">Creating visually stunning designs that tell your brand's story</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 text-gray-700">Web Design</h3>
                  <p className="text-gray-600">Crafting responsive and user-friendly websites</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 text-gray-700">Video Editing</h3>
                  <p className="text-gray-600">Transforming raw footage into compelling visual stories</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 text-gray-700">E-Pins & Educational Services</h3>
                  <p className="text-gray-600">Providing secure access to educational exams with instant e-pins</p>
                </div>
              </div>
            </section>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </>
  )
}

