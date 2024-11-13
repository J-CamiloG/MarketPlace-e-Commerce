import Navbar from '@/components/Navbar'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">About eTrade</h1>

        <section className="mb-12">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="eTrade team"
                  width={600}
                  height={400}
                  className="h-48 w-full object-cover md:h-full md:w-48"
                />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2023, eTrade has quickly become a leading online marketplace, connecting customers with high-quality products from around the world. Our mission is to provide an exceptional shopping experience with a focus on customer satisfaction, product quality, and innovative technology.
                </p>
                <p className="text-gray-600">
                  We believe in the power of e-commerce to transform lives and businesses. By offering a wide range of products at competitive prices, we aim to make quality goods accessible to everyone, while supporting both established brands and emerging artisans.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Customer First</h3>
              <p className="text-gray-600">We prioritize our customers' needs and strive to exceed their expectations in every interaction.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Quality Assurance</h3>
              <p className="text-gray-600">We carefully curate our product selection to ensure the highest standards of quality and value.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">We continuously improve our platform and services to enhance the online shopping experience.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <p className="text-gray-600 mb-4">We'd love to hear from you. Here's how you can reach us...</p>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <Mail className="h-6 w-6 text-purple-600 mr-2" />
                    <span>support@etrade.com</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-6 w-6 text-purple-600 mr-2" />
                    <span>+1 (555) 123-4567</span>
                  </li>
                  <li className="flex items-center">
                    <MapPin className="h-6 w-6 text-purple-600 mr-2" />
                    <span>123 E-Commerce St, Digital City, 12345</span>
                  </li>
                </ul>
              </div>
              <div>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea id="message" name="message" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 px-4 rounded-full hover:from-purple-700 hover:to-blue-600 transition-colors">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-600">&copy; 2023 eTrade. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}