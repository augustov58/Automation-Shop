import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI-Powered Automation Solutions
            </h1>
            <p className="text-xl md:text-2xl mb-10">
              Transform your business operations with cutting-edge AI automation technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services" className="bg-white text-primary-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                Our Services
              </Link>
              <Link href="/contact" className="bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-primary-700 transition">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our AI Automation Solutions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary-600 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Process Automation</h3>
              <p className="text-gray-600">Streamline your business processes with our intelligent automation solutions.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary-600 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Predictive Analytics</h3>
              <p className="text-gray-600">Leverage the power of AI to predict trends and make data-driven decisions.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary-600 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Assistants</h3>
              <p className="text-gray-600">Enhance customer experience with intelligent virtual assistants and chatbots.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today to learn how our AI automation solutions can help your business achieve more with less effort.
          </p>
          <Link href="/contact" className="bg-white text-primary-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition inline-block">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}