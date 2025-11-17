'use client'

import { useEffect, useRef } from 'react'

/**
 * Animated Gradient Mesh Background
 * Creates a dynamic, flowing gradient mesh effect for hero sections
 */
export default function AnimatedMesh({ className = '', variant = 'primary' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Color schemes for different variants
    const colors = {
      primary: [
        'rgba(56, 189, 248, 0.15)', // primary-400
        'rgba(139, 92, 246, 0.15)', // secondary-400
        'rgba(14, 165, 233, 0.1)', // primary-500
      ],
      secondary: [
        'rgba(139, 92, 246, 0.15)', // secondary-400
        'rgba(249, 115, 22, 0.12)', // accent-400
        'rgba(124, 58, 237, 0.1)', // secondary-500
      ],
      dark: [
        'rgba(15, 23, 42, 0.3)', // slate-900
        'rgba(30, 41, 59, 0.25)', // slate-800
        'rgba(51, 65, 85, 0.2)', // slate-700
      ],
    }

    const gradientColors = colors[variant] || colors.primary

    // Gradient mesh points
    const points = []
    const pointCount = 5

    // Initialize points
    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 300 + 200,
      })
    }

    let animationFrame

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw each gradient point
      points.forEach((point, index) => {
        // Update position
        point.x += point.vx
        point.y += point.vy

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1

        // Create radial gradient
        const gradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          point.radius
        )

        gradient.addColorStop(0, gradientColors[index % gradientColors.length])
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        // Draw gradient
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationFrame)
    }
  }, [variant])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

/**
 * Geometric Shapes Background
 * Floating geometric shapes with parallax effect
 */
export function FloatingShapes({ count = 8, className = '' }) {
  const shapesRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!shapesRef.current) return

      const shapes = shapesRef.current.querySelectorAll('.floating-shape')
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2

      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 5
        const moveX = x * speed
        const moveY = y * speed
        shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${index * 45}deg)`
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={shapesRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 100 + 50
        const top = Math.random() * 100
        const left = Math.random() * 100
        const rotation = Math.random() * 360
        const delay = Math.random() * 5

        // Alternate between different shapes
        const shapeType = i % 3

        return (
          <div
            key={i}
            className="floating-shape absolute animate-float-slow opacity-10"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${top}%`,
              left: `${left}%`,
              transform: `rotate(${rotation}deg)`,
              animationDelay: `${delay}s`,
            }}
          >
            {shapeType === 0 && (
              // Square
              <div className="w-full h-full border-2 border-primary-400/30 rounded-lg" />
            )}
            {shapeType === 1 && (
              // Circle
              <div className="w-full h-full border-2 border-secondary-400/30 rounded-full" />
            )}
            {shapeType === 2 && (
              // Triangle
              <div
                className="w-full h-full"
                style={{
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  border: '2px solid rgba(56, 189, 248, 0.3)',
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

/**
 * Grid Overlay
 * Animated grid pattern for tech aesthetic
 */
export function GridOverlay({ className = '', animated = true }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div
        className={`w-full h-full ${animated ? 'animate-pulse' : ''}`}
        style={{
          backgroundImage: `
            linear-gradient(rgba(56, 189, 248, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.5,
        }}
      />
    </div>
  )
}

/**
 * Particles System
 * More advanced particle system with connections
 */
export function ParticleField({ count = 50, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Initialize particles
    const particles = []
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      })
    }

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    let animationFrame

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Move particle
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Mouse interaction
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.vx -= (dx / distance) * force * 0.05
          particle.vy -= (dy / distance) * force * 0.05
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(56, 189, 248, 0.6)'
        ctx.fill()

        // Draw connections to nearby particles
        particles.forEach((otherParticle, j) => {
          if (i === j) return

          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.2 * (1 - distance / 100)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrame)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity: 0.4 }}
    />
  )
}
