'use client'

import { useState } from 'react'
import P5Canvas from './P5Canvas'
import ControlPanel from './ControlPanel'

export type ArtMode = 'flow_field' | 'wave_interference' | 'recursive_tree' | 'mandelbrot' | 'ornstein_uhlenbeck' | 'gray_scott' | 'harmonic_waves' | 'polar_rose' | 'noise_field_sculpture' | 'perlin_landscape' | 'boids' | 'lissajous'

const artworks = [
  { id: 'flow_field', name: 'Flow Field' },
  { id: 'wave_interference', name: 'Wave Interference' },
  { id: 'recursive_tree', name: 'Recursive Tree' },
  { id: 'mandelbrot', name: 'Mandelbrot Set' },
  { id: 'ornstein_uhlenbeck', name: 'Ornstein-Uhlenbeck' },
  { id: 'gray_scott', name: 'Gray-Scott' },
  { id: 'harmonic_waves', name: 'Harmonic Waves' },
  { id: 'polar_rose', name: 'Polar Rose' },
  { id: 'noise_field_sculpture', name: 'Noise Field Sculpture' },
  { id: 'perlin_landscape', name: 'Perlin Landscape' },
  { id: 'boids', name: 'Boids Flocking' },
  { id: 'lissajous', name: 'Lissajous Curves' }
] as const

export default function ArtGallery() {
  const [currentMode, setCurrentMode] = useState<ArtMode>('flow_field')

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white">
      {/* Left Panel - Artwork Selection */}
      <div className="lg:w-64 bg-gray-800 p-4 space-y-2">
        <h1 className="text-xl font-bold mb-4">Generative Art Gallery</h1>
        {artworks.map((artwork) => (
          <button
            key={artwork.id}
            onClick={() => setCurrentMode(artwork.id)}
            className={`w-full text-left p-3 rounded transition-colors ${
              currentMode === artwork.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
            }`}
          >
            {artwork.name}
          </button>
        ))}
      </div>

      {/* Center - Canvas */}
      <div className="flex-1 flex items-center justify-center p-4">
        <P5Canvas mode={currentMode} />
      </div>

      {/* Right Panel - Parameters */}
      <div className="lg:w-80 bg-gray-800 p-4">
        <ControlPanel mode={currentMode} />
      </div>
    </div>
  )
}