import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Globe, Smartphone, Search, Shield } from 'lucide-react'
import { ServiceForm } from '../../components/ServiceForm'
import { CustomProductForm } from '../../components/CustomProductForm'
import { ProtectedRoute } from '../../components/ProtectedRoute'

export default function WebDesignPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-blue-100 py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Web Design Services</h1>
            <p className="text-xl text-center mb-8">Create stunning, functional websites that drive results</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg mb-6">
                A well-designed website is more than just an online presence; it's a reflection of your brand and a tool for achieving your business goals. At Wisdom Technologies, we create websites that combine functionality, aesthetics, and user experience to help you stand out in the digital landscape.
              </p>
              <p className="text-lg mb-6">
                Our web design services cater to a wide range of needs, from personal blogs and portfolio sites to e-commerce platforms and corporate websites. We take a user-centric approach, ensuring that your website is easy to navigate and provides value to visitors.
              </p>
              <p className="text-lg mb-6">
                We begin by understanding your objectives, target audience, and industry. This enables us to create a design strategy that aligns with your goals. Our team of skilled designers and developers then brings your vision to life using the latest technologies and trends.
              </p>
              <p className="text-lg mb-6">
                In addition to design, we focus on optimizing your website for speed, mobile responsiveness, and search engine visibility. This ensures that your site performs well on all devices and ranks higher in search results, driving more organic traffic.
              </p>
              <p className="text-lg mb-6">
                We also offer ongoing support and maintenance services to keep your website updated and secure. Whether you're launching a new site or redesigning an existing one, Wisdom Technologies is here to bring your vision to life.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Web Design Offerings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Globe className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Custom Website Design</h3>
                <p>Tailor-made websites that reflect your brand and meet your specific needs</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Smartphone className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
                <p>Ensure your website looks great and functions well on all devices</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Search className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">SEO Optimization</h3>
                <p>Improve your website's visibility in search engine results</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Shield className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Maintenance & Support</h3>
                <p>Ongoing support to keep your website secure and up-to-date</p>
              </div>
            </div>
          </div>
        </section>
        
        <ProtectedRoute>
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Request Our Web Design Services</h2>
              <div className="max-w-md mx-auto">
                <ServiceForm serviceName="Web Design" />
              </div>
            </div>
          </section>

          <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Create Custom Web Design Product</h2>
              <div className="max-w-md mx-auto">
                <CustomProductForm service="Web Design" />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      </main>
      <Footer />
    </>
  )
}

