'use client'

import { ArtMode } from './ArtGallery'

interface ControlPanelProps {
  mode: ArtMode
}

export default function ControlPanel({ mode }: ControlPanelProps) {
  const handleParameterChange = (param: string, value: number) => {
    // Send parameter changes to p5.js sketch
    if (mode === 'gray_scott' && typeof window.updateGrayScottParameter === 'function') {
      window.updateGrayScottParameter(param, value)
    }
  }

  const getParameters = () => {
    switch (mode) {
      case 'gray_scott':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Gray-Scott Parameters</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Feed Rate</label>
              <input 
                type="range" 
                min="0.01" 
                max="0.1" 
                step="0.005" 
                defaultValue="0.055"
                onChange={(e) => handleParameterChange('feedRate', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">0.055</span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Kill Rate</label>
              <input 
                type="range" 
                min="0.03" 
                max="0.1" 
                step="0.002" 
                defaultValue="0.062"
                onChange={(e) => handleParameterChange('killRate', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">0.062</span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Diffusion A</label>
              <input 
                type="range" 
                min="0.5" 
                max="2.0" 
                step="0.1" 
                defaultValue="1.0"
                onChange={(e) => handleParameterChange('diffusionA', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">1.0</span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Diffusion B</label>
              <input 
                type="range" 
                min="0.1" 
                max="1.0" 
                step="0.05" 
                defaultValue="0.5"
                onChange={(e) => handleParameterChange('diffusionB', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">0.5</span>
            </div>
          </div>
        )
      
      case 'flow_field':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Flow Field Parameters</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Noise Scale</label>
              <input 
                type="range" 
                min="0.001" 
                max="0.1" 
                step="0.001" 
                defaultValue="0.01"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Particle Count</label>
              <input 
                type="range" 
                min="100" 
                max="1000" 
                step="50" 
                defaultValue="500"
                className="w-full"
              />
            </div>
          </div>
        )
      
      case 'wave_interference':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Wave Interference Parameters</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Number of Waves</label>
              <input 
                type="range" 
                min="2" 
                max="8" 
                step="1" 
                defaultValue="3"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Wave Speed</label>
              <input 
                type="range" 
                min="0.01" 
                max="0.1" 
                step="0.01" 
                defaultValue="0.05"
                className="w-full"
              />
            </div>
          </div>
        )
      
      case 'recursive_tree':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recursive Tree Parameters</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Branch Angle</label>
              <input 
                type="range" 
                min="10" 
                max="45" 
                step="1" 
                defaultValue="25"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Length Ratio</label>
              <input 
                type="range" 
                min="0.5" 
                max="0.8" 
                step="0.01" 
                defaultValue="0.67"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Wind Force</label>
              <input 
                type="range" 
                min="0" 
                max="20" 
                step="1" 
                defaultValue="0"
                className="w-full"
              />
            </div>
          </div>
        )
      
      default:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{mode} Parameters</h3>
            <p className="text-gray-400">Parameters coming soon...</p>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Parameters</h2>
        {getParameters()}
      </div>
      
      <div className="border-t border-gray-700 pt-4">
        <h3 className="text-lg font-semibold mb-2">Controls</h3>
        <div className="space-y-2">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
            Reset
          </button>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors">
            Save Image
          </button>
        </div>
      </div>
      
      <div className="border-t border-gray-700 pt-4">
        <h3 className="text-lg font-semibold mb-2">Info</h3>
        <div className="text-sm text-gray-400 space-y-1">
          <p>Current Mode: <span className="text-white">{mode}</span></p>
          <p>Canvas Size: 600x600</p>
        </div>
      </div>
    </div>
  )
}