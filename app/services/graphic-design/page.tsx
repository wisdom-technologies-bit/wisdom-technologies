import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Palette, Image, Monitor, PenTool } from 'lucide-react'
import { ServiceForm } from '../../components/ServiceForm'
import { CustomProductForm } from '../../components/CustomProductForm'
import { ProtectedRoute } from '../../components/ProtectedRoute'

export default function GraphicDesignPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-purple-100 py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Graphic Design Services</h1>
            <p className="text-xl text-center mb-8">Captivating visual designs that tell your brand's story</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg mb-6">
                Graphic design is the cornerstone of effective communication in today's digital and print world. At Wisdom Technologies, we understand the power of visual storytelling and how it influences your audience. Our graphic design services go beyond mere aesthetics to deliver designs that captivate, engage, and resonate with your target market.
              </p>
              <p className="text-lg mb-6">
                We specialize in creating logos that are not only visually appealing but also embody your brand's essence. Our logo designs are tailored to leave a lasting impression, helping your business stand out in a crowded marketplace. Beyond logos, we craft eye-catching brochures, flyers, posters, and business cards that communicate your message effectively.
              </p>
              <p className="text-lg mb-6">
                For businesses operating online, our social media graphics are designed to drive engagement and conversions. From Instagram posts to Facebook banners, we design content that aligns with your branding while adhering to platform-specific requirements.
              </p>
              <p className="text-lg mb-6">
                Our design process is collaborative. We work closely with you to understand your goals, preferences, and brand identity. Using the latest design tools and trends, we ensure each project is delivered on time and exceeds expectations. Whether you're starting from scratch or revamping your existing designs, Wisdom Technologies is here to bring your vision to life.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Graphic Design Offerings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Palette className="h-12 w-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Logo Design</h3>
                <p>Create a unique and memorable identity for your brand</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Image className="h-12 w-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Print Materials</h3>
                <p>Design eye-catching brochures, flyers, posters, and business cards</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Monitor className="h-12 w-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Social Media Graphics</h3>
                <p>Craft engaging visuals for various social media platforms</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <PenTool className="h-12 w-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Custom Illustrations</h3>
                <p>Create unique illustrations to enhance your brand's visual appeal</p>
              </div>
            </div>
          </div>
        </section>

        <ProtectedRoute>
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Request Our Graphic Design Services</h2>
              <div className="max-w-md mx-auto">
                <ServiceForm serviceName="Graphic Design" />
              </div>
            </div>
          </section>

          <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Create Custom Graphic Design Product</h2>
              <div className="max-w-md mx-auto">
                <CustomProductForm service="Graphic Design" />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      </main>
      <Footer />
    </>
  )
}

