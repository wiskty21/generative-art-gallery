'use client'

import { useEffect, useRef } from 'react'
import { ArtMode } from './ArtGallery'

interface P5CanvasProps {
  mode: ArtMode
}

export default function P5Canvas({ mode }: P5CanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const currentScriptRef = useRef<HTMLScriptElement | null>(null)
  const loadedScriptsRef = useRef<Set<HTMLScriptElement>>(new Set())
  const p5ScriptRef = useRef<HTMLScriptElement | null>(null)

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return

    // Complete cleanup function
    const performCompleteCleanup = () => {
      // Clean up existing p5 instance
      if (typeof window.remove === 'function') {
        window.remove()
      }

      // Remove current p5 instance cache - more aggressive cleanup
      if (typeof window.currentP5Instance !== 'undefined') {
        try {
          if (typeof window.currentP5Instance.remove === 'function') {
            window.currentP5Instance.remove()
          }
          window.currentP5Instance = undefined
          delete window.currentP5Instance
        } catch (e) {
          console.warn('Could not clean current p5 instance:', e)
        }
      }

      // Force stop all p5 animations and clean up any remaining instances
      try {
        // Stop all animation loops
        if (typeof window.noLoop === 'function') {
          window.noLoop()
        }
        
        // Clean up any p5 instances that might be running
        const possibleP5Instances = ['_p5instance', '_instance', 'p5Instance']
        possibleP5Instances.forEach(name => {
          if (typeof window[name] !== 'undefined') {
            try {
              if (typeof window[name].remove === 'function') {
                window[name].remove()
              }
              window[name] = undefined
              delete window[name]
            } catch (e) {
              console.warn(`Could not clean ${name}:`, e)
            }
          }
        })
      } catch (e) {
        console.warn('Could not stop all animations:', e)
      }

      // Remove all tracked scripts (but keep p5.js library)
      loadedScriptsRef.current.forEach(script => {
        try {
          if (script.parentNode && script !== p5ScriptRef.current) {
            document.head.removeChild(script)
          }
        } catch (e) {
          console.warn('Could not remove script:', e)
        }
      })
      loadedScriptsRef.current.clear()
      // Keep p5.js in tracking if it exists
      if (p5ScriptRef.current) {
        loadedScriptsRef.current.add(p5ScriptRef.current)
      }

      // Remove current script reference
      if (currentScriptRef.current) {
        try {
          if (currentScriptRef.current.parentNode) {
            document.head.removeChild(currentScriptRef.current)
          }
        } catch (e) {
          console.warn('Could not remove current script:', e)
        }
        currentScriptRef.current = null
      }

      // Comprehensive p5.js global variables cleanup
      try {
        const allP5Globals = [
          // Gray-Scott specific
          'gsGrid', 'gsNextGrid', 'gsWidth', 'gsHeight', 'gsFeedRate', 'gsKillRate', 
          'gsDiffusionA', 'gsDiffusionB', 'gsDt', 'updateGrayScottParameter',
          // Flow Field specific
          'particles', 'flowField', 'fieldSize', 'noiseScale', 'flowForce',
          // Wave Interference specific
          'waves', 'waveAmplitude', 'waveFrequency', 'damping',
          // Recursive Tree specific
          'windStrength', 'branchAngle', 'minLength',
          // Common p5.js globals
          'setup', 'draw', 'preload', 'windowResized', 'mousePressed', 'mouseDragged',
          'keyPressed', 'keyReleased', 'touchStarted', 'touchMoved', 'touchEnded',
          // Animation frame functions
          'noLoop', 'loop', 'redraw', 'frameCount', 'deltaTime',
          // Instance and cache variables
          'currentP5Instance', 'flowFieldSketch', 'Particle',
          // Canvas elements cache
          '_p5Canvas', '_defaultCanvas',
          // Sketch-specific markers and functions
          'grayScottSketch', 'harmonicWavesSketch', 'waveInterferenceSketch', 'mandelbrotSketch',
          'ornsteinUhlenbeckSketch', 'polarRoseSketch', 'noiseFieldSculptureSketch', 'recursiveTreeSketch',
          // Sketch control functions
          'updateHarmonicWavesParameter', 'updateWaveInterferenceParameter', 'updateGrayScottParameter',
          'updateMandelbrotParameter', 'updateOrnsteinUhlenbeckParameter', 'updatePolarRoseParameter',
          'updateNoiseFieldSculptureParameter', 'updateRecursiveTreeParameter'
        ]
        
        allP5Globals.forEach(varName => {
          try {
            if (typeof window[varName] !== 'undefined') {
              window[varName] = undefined
              delete window[varName]
            }
          } catch {
            // Some properties cannot be deleted, that's okay
          }
        })
      } catch (e) {
        console.warn('Could not clean all global variables:', e)
      }

      // Force garbage collection hint (if available)
      if (typeof window.gc === 'function') {
        window.gc()
      }
    }

    // Perform cleanup
    performCompleteCleanup()

    // Clear container and remove all canvas elements
    const container = containerRef.current
    container.innerHTML = ''
    
    // Remove any existing canvas elements from document
    const existingCanvases = document.querySelectorAll('canvas, #p5-canvas-container')
    existingCanvases.forEach(canvas => {
      try {
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas)
        }
      } catch (e) {
        console.warn('Could not remove canvas element:', e)
      }
    })

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
        if (typeof window.p5 !== 'undefined' && p5ScriptRef.current) {
          resolve()
          return
        }
        
        // Only create new p5 script if it doesn't exist
        if (!p5ScriptRef.current) {
          const p5Script = document.createElement('script')
          p5Script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js'
          p5Script.onload = () => {
            console.log('p5.js loaded successfully (once)')
            console.log('createCanvas available:', typeof window.createCanvas)
            resolve()
          }
          document.head.appendChild(p5Script)
          p5ScriptRef.current = p5Script
          loadedScriptsRef.current.add(p5Script)
        } else {
          resolve()
        }
      })
    }

    // Load sketch script after p5.js is ready and cleanup is complete
    loadP5().then(() => {
      // Increased delay to ensure complete cleanup
      setTimeout(() => {
        const sketchScript = document.createElement('script')
        // Add cache-busting parameter to prevent browser caching
        const cacheBuster = `?t=${Date.now()}&mode=${mode}`
        sketchScript.src = scriptPath + cacheBuster
        sketchScript.setAttribute('data-sketch-mode', mode)
        sketchScript.onload = () => {
          console.log(`Loaded sketch: ${mode}`)
          console.log('p5-canvas-container exists:', !!document.getElementById('p5-canvas-container'))
          console.log('p5 createCanvas available:', typeof window.createCanvas)
          
          // Verify only one p5 instance is running
          setTimeout(() => {
            const canvases = document.querySelectorAll('canvas')
            console.log(`Active canvases after load: ${canvases.length}`)
            if (canvases.length > 1) {
              console.warn('Multiple canvases detected - potential memory leak!')
            }
          }, 100)
        }
        sketchScript.onerror = () => {
          console.error(`Failed to load sketch: ${mode}`)
          container.innerHTML = '<div class="flex items-center justify-center h-full text-red-400">Failed to load sketch</div>'
          // Remove failed script from tracking
          loadedScriptsRef.current.delete(sketchScript)
        }
        document.head.appendChild(sketchScript)
        currentScriptRef.current = sketchScript
        loadedScriptsRef.current.add(sketchScript)
      }, 300) // Increased delay to 300ms for more thorough cleanup
    })

    // Enhanced cleanup function
    return () => {
      // Stop any animations immediately
      if (typeof window.noLoop === 'function') {
        window.noLoop()
      }

      // Remove p5 instance
      if (typeof window.remove === 'function') {
        window.remove()
      }

      // Remove all tracked scripts (but keep p5.js library)
      loadedScriptsRef.current.forEach(script => {
        try {
          if (script.parentNode && script !== p5ScriptRef.current) {
            document.head.removeChild(script)
          }
        } catch (e) {
          console.warn('Cleanup: Could not remove script:', e)
        }
      })
      loadedScriptsRef.current.clear()
      // Keep p5.js in tracking if it exists
      if (p5ScriptRef.current) {
        loadedScriptsRef.current.add(p5ScriptRef.current)
      }

      // Remove current script
      if (currentScriptRef.current) {
        try {
          if (currentScriptRef.current.parentNode) {
            document.head.removeChild(currentScriptRef.current)
          }
        } catch (e) {
          console.warn('Cleanup: Could not remove current script:', e)
        }
        currentScriptRef.current = null
      }

      // Clear container
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
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