'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function DiscoveryCallCalendar() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [step, setStep] = useState(1) // 1: Date selection, 2: Time selection, 3: Form
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Available time slots (in a real app, these would come from an API)
  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']

  // Generate calendar days for current month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: '', isCurrentMonth: false })
    }

    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      const isWeekend = date.getDay() === 0 || date.getDay() === 6
      const isPast = date < new Date().setHours(0, 0, 0, 0)

      days.push({
        day: i,
        date: new Date(year, month, i),
        isCurrentMonth: true,
        isSelectable: !isWeekend && !isPast,
      })
    }

    return days
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const handleDateSelect = date => {
    setSelectedDate(date)
    setStep(2)
  }

  const handleTimeSelect = time => {
    setSelectedTime(time)
    setStep(3)
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, you would send this data to your backend
    // For now, we'll simulate a successful submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  const handleBack = () => {
    if (step === 2) {
      setStep(1)
      setSelectedDate(null)
    } else if (step === 3) {
      setStep(2)
      setSelectedTime(null)
    }
  }

  const formatDate = date => {
    if (!date) return ''
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const calendarDays = generateCalendarDays()
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div className="w-full">
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-10"
        >
          <div className="mb-6 text-[rgba(56,189,248,0.8)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Discovery Call Scheduled!</h3>
          <p className="text-gray-300 mb-6">
            Your discovery call is scheduled for {formatDate(selectedDate)} at {selectedTime}. We've
            sent a confirmation email to {formData.email} with all the details.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false)
              setStep(1)
              setSelectedDate(null)
              setSelectedTime(null)
              setFormData({ name: '', email: '', company: '', message: '' })
            }}
            className="btn-secondary"
          >
            Schedule Another Call
          </button>
        </motion.div>
      ) : (
        <div>
          {/* Step indicator */}
          <div className="flex justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-700 -z-10 transform -translate-y-1/2"></div>
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 ${
                  step >= i
                    ? 'bg-[rgba(56,189,248,0.2)] border border-[rgba(56,189,248,0.5)]'
                    : 'bg-gray-800 border border-gray-700'
                }`}
              >
                {step > i ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[rgba(56,189,248,0.8)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className={step === i ? 'text-white' : 'text-gray-400'}>{i}</span>
                )}
              </div>
            ))}
          </div>

          {/* Step labels */}
          <div className="flex justify-between mb-8 text-sm">
            <div className={`text-center w-1/3 ${step === 1 ? 'text-white' : 'text-gray-400'}`}>
              Select Date
            </div>
            <div className={`text-center w-1/3 ${step === 2 ? 'text-white' : 'text-gray-400'}`}>
              Select Time
            </div>
            <div className={`text-center w-1/3 ${step === 3 ? 'text-white' : 'text-gray-400'}`}>
              Your Details
            </div>
          </div>

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="calendar-container"
            >
              <div className="flex justify-between items-center mb-6">
                <button onClick={handlePrevMonth} className="btn-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <h3 className="text-xl font-medium text-white">{monthName}</h3>
                <button onClick={handleNextMonth} className="btn-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekdays.map(day => (
                  <div key={day} className="text-center text-gray-400 text-sm py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`
                      h-12 flex items-center justify-center rounded-md text-sm
                      ${!day.isCurrentMonth ? 'invisible' : ''}
                      ${day.isSelectable ? 'cursor-pointer hover:bg-[rgba(56,189,248,0.1)]' : 'text-gray-600'}
                    `}
                    onClick={() => day.isSelectable && handleDateSelect(day.date)}
                  >
                    {day.day}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-6">
                <button
                  onClick={handleBack}
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back
                </button>
              </div>

              <h3 className="text-xl font-medium text-white mb-4">
                Select a time for {formatDate(selectedDate)}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    className="feature-card py-3 px-4 text-center hover:border-[rgba(56,189,248,0.5)] transition-all"
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-6">
                <button
                  onClick={handleBack}
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back
                </button>
              </div>

              <div className="mb-6 p-4 bg-[rgba(56,189,248,0.1)] border border-[rgba(56,189,248,0.2)] rounded-lg">
                <h3 className="text-lg font-medium text-white mb-2">Discovery Call Details</h3>
                <p className="text-gray-300">
                  Date: {formatDate(selectedDate)}
                  <br />
                  Time: {selectedTime}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-space"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-space"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="input-space"
                    placeholder="Enter your company name"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2">
                    What would you like to discuss?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="input-space"
                    placeholder="Tell us about your needs"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Schedule Discovery Call'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}
