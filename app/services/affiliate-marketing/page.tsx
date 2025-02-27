import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { TrendingUp, Users, BarChart, HeadphonesIcon } from 'lucide-react'
import { ServiceForm } from '../../components/ServiceForm'
import { CustomProductForm } from '../../components/CustomProductForm'
import { ProtectedRoute } from '../../components/ProtectedRoute'

export default function AffiliateMarketingPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-green-100 py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Affiliate Marketing Services</h1>
            <p className="text-xl text-center mb-8">Unlock passive income potential through strategic partnerships</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg mb-6">
                Affiliate marketing is a powerful way to generate passive income by promoting products or services and earning a commission on successful referrals. At Wisdom Technologies, we are committed to empowering individuals and businesses to unlock the potential of affiliate marketing through comprehensive training and mentorship.
              </p>
              <p className="text-lg mb-6">
                Our program is designed for beginners and seasoned marketers alike. We start by introducing you to the fundamentals, including understanding affiliate networks, selecting profitable niches, and identifying high-converting products. From there, we guide you through advanced strategies, such as building effective sales funnels, email marketing, and leveraging social media platforms for traffic generation.
              </p>
              <p className="text-lg mb-6">
                We don't just provide theoretical knowledge; we offer practical, actionable insights. Our experts walk you through setting up your affiliate accounts, creating content that converts, and tracking your performance using analytical tools. In addition, we provide templates, case studies, and real-world examples to help you grasp concepts easily.
              </p>
              <p className="text-lg mb-6">
                With our ongoing support, you'll have access to a community of like-minded individuals, regular updates on industry trends, and one-on-one coaching sessions. Whether you aim to supplement your income or build a full-fledged affiliate marketing business, Wisdom Technologies has the resources and expertise to help you succeed.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Affiliate Marketing Offerings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <TrendingUp className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Strategy Development</h3>
                <p>Craft a winning affiliate marketing strategy tailored to your niche</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Users className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Network Building</h3>
                <p>Learn how to build and nurture relationships with affiliate partners</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <BarChart className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Performance Tracking</h3>
                <p>Master the tools and metrics to optimize your affiliate campaigns</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <HeadphonesIcon className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ongoing Support</h3>
                <p>Get continuous guidance and support from our expert team</p>
              </div>
            </div>
          </div>
        </section>
        
        <ProtectedRoute>
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Request Our Affiliate Marketing Services</h2>
              <div className="max-w-md mx-auto">
                <ServiceForm serviceName="Affiliate Marketing" />
              </div>
            </div>
          </section>

          <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Create Custom Affiliate Marketing Product</h2>
              <div className="max-w-md mx-auto">
                <CustomProductForm service="Affiliate Marketing" />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      </main>
      <Footer />
    </>
  )
}

