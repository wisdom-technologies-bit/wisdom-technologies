import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Video, Scissors, Music, Zap } from 'lucide-react'
import { ServiceForm } from '../../components/ServiceForm'
import { CustomProductForm } from '../../components/CustomProductForm'
import { ProtectedRoute } from '../../components/ProtectedRoute'

export default function VideoEditingPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-red-100 py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Video Editing Services</h1>
            <p className="text-xl text-center mb-8">Transform raw footage into compelling visual stories</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg mb-6">
                Video content is one of the most effective ways to communicate your message, whether for personal projects, corporate presentations, or social media campaigns. At Wisdom Technologies, we provide professional video editing services that turn raw footage into polished, compelling stories.
              </p>
              <p className="text-lg mb-6">
                Our editing process starts with understanding your vision and objectives. We work with you to develop a clear storyboard, ensuring that the final product aligns with your goals. Whether you need basic trimming and sequencing or advanced effects and animations, our team is equipped to handle projects of all sizes and complexities.
              </p>
              <p className="text-lg mb-6">
                We enhance your videos with transitions, color grading, sound design, and special effects to make them visually stunning and emotionally impactful. For corporate clients, we create promotional videos, training materials, and product demos that leave a lasting impression. For individuals, we edit wedding videos, travel vlogs, and other personal projects to preserve your precious memories.
              </p>
              <p className="text-lg mb-6">
                We stay updated with the latest trends and technologies in video editing, ensuring that your content stands out in a competitive market. With quick turnaround times and a commitment to quality, Wisdom Technologies is your go-to partner for all your video editing needs.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Video Editing Offerings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Video className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Professional Editing</h3>
                <p>Expert editing for corporate videos, documentaries, and promotional content</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Scissors className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Color Grading</h3>
                <p>Enhance the visual appeal of your videos with professional color correction</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Music className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Sound Design</h3>
                <p>Create immersive audio experiences with our expert sound editing</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Zap className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Special Effects</h3>
                <p>Add stunning visual effects and animations to elevate your video content</p>
              </div>
            </div>
          </div>
        </section>
        
        <ProtectedRoute>
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Request Our Video Editing Services</h2>
              <div className="max-w-md mx-auto">
                <ServiceForm serviceName="Video Editing" />
              </div>
            </div>
          </section>

          <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Create Custom Video Editing Product</h2>
              <div className="max-w-md mx-auto">
                <CustomProductForm service="Video Editing" />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      </main>
      <Footer />
    </>
  )
}

