"use client"

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'

export default function ContactDialog({ trigger }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, you would handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      service: '',
      message: '',
    })
    // Close dialog (you would need to implement this with state)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Contact Us</DialogTitle>
          <DialogDescription className="text-slate-300">
            Fill out the form below and we'll get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md focus:ring-white focus:border-white text-white"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md focus:ring-white focus:border-white text-white"
            />
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-1">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md focus:ring-white focus:border-white text-white"
            />
          </div>
          
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-slate-300 mb-1">
              Service of Interest
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md focus:ring-white focus:border-white text-white"
            >
              <option value="">Select a service</option>
              <option value="process-automation">Process Automation</option>
              <option value="predictive-analytics">Predictive Analytics</option>
              <option value="smart-assistants">Smart Assistants</option>
              <option value="computer-vision">Computer Vision</option>
              <option value="nlp">Natural Language Processing</option>
              <option value="custom-solutions">Custom AI Solutions</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md focus:ring-white focus:border-white text-white"
            ></textarea>
          </div>
          
          <DialogFooter>
            <button
              type="submit"
              className="w-full bg-white text-slate-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Send Message
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 