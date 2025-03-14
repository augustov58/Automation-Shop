export default function ServicesPage() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-6 text-primary-700">Our AI Automation Services</h1>
          <p className="text-xl text-gray-600">
            We provide cutting-edge AI automation solutions designed to streamline your operations, 
            increase efficiency, and drive growth.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-primary-600 flex items-center justify-center p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-primary-700">Process Automation</h3>
              <p className="text-gray-600 mb-4">
                Automate repetitive tasks and workflows to free up your team's time for higher-value activities.
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-600">
                <li>Workflow automation</li>
                <li>Document processing</li>
                <li>Data entry and extraction</li>
                <li>Business process optimization</li>
              </ul>
              <a href="/services/process-automation" className="text-primary-600 font-semibold hover:text-primary-800 inline-flex items-center">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Service 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-primary-600 flex items-center justify-center p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-primary-700">Predictive Analytics</h3>
              <p className="text-gray-600 mb-4">
                Harness the power of AI to analyze data patterns and predict future trends with remarkable accuracy.
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-600">
                <li>Sales forecasting</li>
                <li>Demand prediction</li>
                <li>Customer behavior analysis</li>
                <li>Market trend identification</li>
              </ul>
              <a href="/services/predictive-analytics" className="text-primary-600 font-semibold hover:text-primary-800 inline-flex items-center">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Service 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-primary-600 flex items-center justify-center p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-primary-700">Smart Assistants</h3>
              <p className="text-gray-600 mb-4">
                Implement intelligent virtual assistants and chatbots to enhance customer service and support.
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-600">
                <li>Customer service chatbots</li>
                <li>Virtual assistants</li>
                <li>Knowledge base automation</li>
                <li>Multi-channel support</li>
              </ul>
              <a href="/services/smart-assistants" className="text-primary-600 font-semibold hover:text-primary-800 inline-flex items-center">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Service 4 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-primary-600 flex items-center justify-center p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-primary-700">Computer Vision</h3>
              <p className="text-gray-600 mb-4">
                Utilize AI-powered image and video analysis for advanced recognition and classification tasks.
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-600">
                <li>Object detection</li>
                <li>Image classification</li>
                <li>Quality control automation</li>
                <li>Visual inspection systems</li>
              </ul>
              <a href="/services/computer-vision" className="text-primary-600 font-semibold hover:text-primary-800 inline-flex items-center">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Service 5 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-primary-600 flex items-center justify-center p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-primary-700">Natural Language Processing</h3>
              <p className="text-gray-600 mb-4">
                Implement text and speech processing capabilities to understand and generate human language.
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-600">
                <li>Sentiment analysis</li>
                <li>Text classification</li>
                <li>Language understanding</li>
                <li>Document summarization</li>
              </ul>
              <a href="/services/nlp" className="text-primary-600 font-semibold hover:text-primary-800 inline-flex items-center">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Service 6 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-primary-600 flex items-center justify-center p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-primary-700">Custom AI Solutions</h3>
              <p className="text-gray-600 mb-4">
                Tailored AI solutions designed specifically for your unique business challenges and requirements.
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-600">
                <li>Custom AI model development</li>
                <li>Integration with existing systems</li>
                <li>Specialized automation workflows</li>
                <li>Industry-specific solutions</li>
              </ul>
              <a href="/services/custom-solutions" className="text-primary-600 font-semibold hover:text-primary-800 inline-flex items-center">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 bg-primary-700 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Automate Your Business?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Contact us today for a free consultation to discuss how our AI automation solutions can 
            transform your business operations and drive growth.
          </p>
          <a href="/contact" className="bg-white text-primary-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition inline-block">
            Schedule a Consultation
          </a>
        </div>
      </div>
    </div>
  )
}