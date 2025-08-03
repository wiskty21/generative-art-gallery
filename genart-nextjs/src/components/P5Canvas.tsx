'use client'

import { useEffect, useRef } from 'react'
import { ArtMode } from './ArtGallery'

interface P5CanvasProps {
  mode: ArtMode
}

export default function P5Canvas({ mode }: P5CanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const currentScriptRef = useRef<HTMLScriptElement | null>(null)

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return

    // Clean up existing p5 instance
    if (typeof window.remove === 'function') {
      window.remove()
    }

    // Remove existing script
    if (currentScriptRef.current) {
      document.head.removeChild(currentScriptRef.current)
      currentScriptRef.current = null
    }

    // Clear p5 global variables safely
    try {
      const p5Globals = ['gsGrid', 'gsNextGrid', 'gsWidth', 'gsHeight', 'gsFeedRate', 'gsKillRate', 'gsDiffusionA', 'gsDiffusionB', 'gsDt', 'updateGrayScottParameter']
      p5Globals.forEach(varName => {
        try {
          if (typeof window[varName] !== 'undefined') {
            window[varName] = undefined
          }
        } catch {
          // Some properties cannot be deleted, that's okay
        }
      })
    } catch (e) {
      console.warn('Could not clean all global variables:', e)
    }

    // Clear container
    const container = containerRef.current
    container.innerHTML = ''

    // Load appropriate sketch script
    const getSketchPath = (mode: ArtMode) => {
      switch (mode) {
        case 'gray_scott':
          return '/sketches/gray-scott.js'
        case 'flow_field':
          return '/sketches/flow-field.js'
        case 'wave_interference':
          return '/sketches/wave-interference.js'
        case 'recursive_tree':
          return '/sketches/recursive-tree.js'
        case 'mandelbrot':
          return '/sketches/mandelbrot.js'
        case 'ornstein_uhlenbeck':
          return '/sketches/ornstein-uhlenbeck.js'
        case 'harmonic_waves':
          return '/sketches/harmonic-waves.js'
        case 'polar_rose':
          return '/sketches/polar-rose.js'
        case 'noise_field_sculpture':
          return '/sketches/noise-field-sculpture.js'
        default:
          return null // All 9 artworks are now implemented
      }
    }

    const scriptPath = getSketchPath(mode)
    if (!scriptPath) {
      // Fallback for non-implemented modes
      container.innerHTML = '<div class="flex items-center justify-center h-full text-gray-400">This mode is not yet implemented in the new architecture</div>'
      return
    }

    // Create container div for p5.js
    const canvasDiv = document.createElement('div')
    canvasDiv.id = 'p5-canvas-container'
    canvasDiv.className = 'w-full h-full flex items-center justify-center'
    container.appendChild(canvasDiv)

    // Load p5.js library first, then the sketch
    const loadP5 = () => {
      return new Promise<void>((resolve) => {
        if (typeof window.p5 !== 'undefined') {
          resolve()
          return
        }
        
        const p5Script = document.createElement('script')
        p5Script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js'
        p5Script.onload = () => {
          console.log('p5.js loaded successfully')
          console.log('createCanvas available:', typeof window.createCanvas)
          resolve()
        }
        document.head.appendChild(p5Script)
      })
    }

    // Load sketch script after p5.js is ready and cleanup is complete
    loadP5().then(() => {
      setTimeout(() => {
        const sketchScript = document.createElement('script')
        sketchScript.src = scriptPath
        sketchScript.onload = () => {
          console.log(`Loaded sketch: ${mode}`)
          console.log('p5-canvas-container exists:', !!document.getElementById('p5-canvas-container'))
          console.log('p5 createCanvas available:', typeof window.createCanvas)
        }
        sketchScript.onerror = () => {
          console.error(`Failed to load sketch: ${mode}`)
          container.innerHTML = '<div class="flex items-center justify-center h-full text-red-400">Failed to load sketch</div>'
        }
        document.head.appendChild(sketchScript)
        currentScriptRef.current = sketchScript
      }, 100) // 100ms delay to ensure cleanup is complete
    })

    // Cleanup function
    return () => {
      if (currentScriptRef.current) {
        document.head.removeChild(currentScriptRef.current)
        currentScriptRef.current = null
      }
      if (typeof window.remove === 'function') {
        window.remove()
      }
    }
  }, [mode])

  return (
    <div 
      ref={containerRef} 
      className="flex items-center justify-center w-full h-full bg-black rounded-lg"
    />
  )
}