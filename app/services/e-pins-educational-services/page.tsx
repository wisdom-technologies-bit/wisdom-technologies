import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { BookOpen, Shield, Clock, CreditCard } from 'lucide-react'

export default function EPinsEducationalServicesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-indigo-100 py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">E-Pins and Educational Services</h1>
            <p className="text-xl text-center mb-8">Secure access to educational exams with instant e-pins</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg mb-6">
                At Wisdom Technologies, we specialize in providing E-pins for various educational examination bodies. These e-pins are digital codes that allow candidates to register for exams and services offered by educational institutions, ensuring a seamless, quick, and secure registration process.
              </p>
              <p className="text-lg mb-6">
                Our e-pins cover popular examinations such as the West African Examinations Council (WAEC), National Examinations Council (NECO), and National Business and Technical Examinations Board (NABTEB), with set prices that align with the respective examination body's current rates.
              </p>
              <h2 className="text-2xl font-bold mb-4">Our E-Pin Offerings</h2>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-4">
                  <strong>WAEC E-Pin (₦6,000):</strong> Essential for students planning to complete their high school education and pursue higher education opportunities.
                </li>
                <li className="mb-4">
                  <strong>NECO E-Pin (₦5,000):</strong> Specific to Nigerian students, serving as an alternative to WAEC for those pursuing higher education or employment.
                </li>
                <li className="mb-4">
                  <strong>NABTEB E-Pin (₦4,000):</strong> Crucial for students who wish to pursue careers in technical fields, including engineering, construction, and business.
                </li>
              </ul>
              <h2 className="text-2xl font-bold mb-4">Why Choose Wisdom Technologies for E-Pins?</h2>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">Instant Delivery</li>
                <li className="mb-2">Secure Transactions</li>
                <li className="mb-2">Exceptional Customer Support</li>
                <li className="mb-2">Trusted and Reliable Service</li>
                <li className="mb-2">Convenient Payment Options</li>
                <li className="mb-2">Competitive and Affordable Prices</li>
              </ul>
              <p className="text-lg mb-6">
                Whether you're registering for WAEC, NECO, or NABTEB, Wisdom Technologies makes your exam registration process seamless, secure, and straightforward. Let us help you take the next step toward your academic and professional goals with ease.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our E-Pin Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <BookOpen className="h-12 w-12 text-indigo-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Multiple Exam Bodies</h3>
                <p>Access e-pins for WAEC, NECO, and NABTEB examinations</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Shield className="h-12 w-12 text-indigo-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
                <p>Guaranteed protection of your personal and payment information</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Clock className="h-12 w-12 text-indigo-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Instant Delivery</h3>
                <p>Receive your e-pin immediately after payment processing</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <CreditCard className="h-12 w-12 text-indigo-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Flexible Payment Options</h3>
                <p>Choose from various secure payment methods for your convenience</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

