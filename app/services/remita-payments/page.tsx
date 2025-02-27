import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { CreditCard, Settings, BarChart, HeadphonesIcon } from 'lucide-react'
import { ServiceForm } from '../../components/ServiceForm'
import { CustomProductForm } from '../../components/CustomProductForm'
import { ProtectedRoute } from '../../components/ProtectedRoute'

export default function RemitaPaymentsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-yellow-100 py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Remita Payment Solutions</h1>
            <p className="text-xl text-center mb-8">Streamline your payment processes with our Remita solutions</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg mb-6">
                Managing payments can be a complex and time-consuming process, but Wisdom Technologies simplifies it with our Remita payment solutions. Remita is a trusted payment gateway that enables individuals and businesses to receive and make payments seamlessly.
              </p>
              <p className="text-lg mb-6">
                Our services include setting up Remita accounts, integrating payment systems into your website or mobile app, and providing ongoing support to ensure smooth transactions. Whether you're running a small business or a large corporation, we tailor our solutions to meet your specific needs.
              </p>
              <p className="text-lg mb-6">
                With Remita, you can process payments from multiple channels, including bank transfers, debit cards, and mobile wallets. This flexibility makes it easier for your customers to pay, improving their experience and boosting your revenue.
              </p>
              <p className="text-lg mb-6">
                We also provide tools for tracking and reconciling transactions, helping you manage your finances more efficiently. Our team is available to assist with any technical issues or questions, ensuring that your payment processes run smoothly at all times.
              </p>
              <p className="text-lg mb-6">
                By partnering with Wisdom Technologies for your Remita payment needs, you can focus on growing your business while we handle the complexities of payment management.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Remita Payment Offerings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <CreditCard className="h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Payment Gateway Integration</h3>
                <p>Seamlessly integrate Remita payment gateway into your website or app</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Settings className="h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Account Setup & Management</h3>
                <p>Expert assistance in setting up and managing your Remita account</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <BarChart className="h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Transaction Tracking & Reconciliation</h3>
                <p>Powerful tools to monitor and reconcile your payment transactions</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <HeadphonesIcon className="h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ongoing Support</h3>
                <p>Dedicated technical support to ensure smooth payment operations</p>
              </div>
            </div>
          </div>
        </section>
        
        <ProtectedRoute>
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Request Our Remita Payment Services</h2>
              <div className="max-w-md mx-auto">
                <ServiceForm serviceName="Remita Payments" />
              </div>
            </div>
          </section>

          <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Create Custom Remita Payment Product</h2>
              <div className="max-w-md mx-auto">
                <CustomProductForm service="Remita Payments" />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      </main>
      <Footer />
    </>
  )
}

