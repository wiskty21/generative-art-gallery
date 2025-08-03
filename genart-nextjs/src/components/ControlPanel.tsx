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
    } else if (mode === 'flow_field' && typeof window.updateFlowFieldParameter === 'function') {
      window.updateFlowFieldParameter(param, value)
    } else if (mode === 'wave_interference' && typeof window.updateWaveInterferenceParameter === 'function') {
      window.updateWaveInterferenceParameter(param, value)
    } else if (mode === 'recursive_tree' && typeof window.updateRecursiveTreeParameter === 'function') {
      window.updateRecursiveTreeParameter(param, value)
    } else if (mode === 'mandelbrot' && typeof window.updateMandelbrotParameter === 'function') {
      window.updateMandelbrotParameter(param, value)
    } else if (mode === 'ornstein_uhlenbeck' && typeof window.updateOrnsteinUhlenbeckParameter === 'function') {
      window.updateOrnsteinUhlenbeckParameter(param, value)
    } else if (mode === 'harmonic_waves' && typeof window.updateHarmonicWavesParameter === 'function') {
      window.updateHarmonicWavesParameter(param, value)
    } else if (mode === 'polar_rose' && typeof window.updatePolarRoseParameter === 'function') {
      window.updatePolarRoseParameter(param, value)
    } else if (mode === 'noise_field_sculpture' && typeof window.updateNoiseFieldSculptureParameter === 'function') {
      window.updateNoiseFieldSculptureParameter(param, value)
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
                onChange={(e) => handleParameterChange('noiseScale', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">0.01</span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Particle Count</label>
              <input 
                type="range" 
                min="100" 
                max="1000" 
                step="50" 
                defaultValue="500"
                onChange={(e) => handleParameterChange('particleCount', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">500</span>
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
                onChange={(e) => handleParameterChange('numWaves', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">3</span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Wave Speed</label>
              <input 
                type="range" 
                min="0.01" 
                max="0.2" 
                step="0.01" 
                defaultValue="0.1"
                onChange={(e) => handleParameterChange('waveSpeed', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">0.1</span>
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
                onChange={(e) => handleParameterChange('angle', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">25°</span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Length Ratio</label>
              <input 
                type="range" 
                min="0.5" 
                max="0.8" 
                step="0.01" 
                defaultValue="0.67"
                onChange={(e) => handleParameterChange('lengthRatio', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">0.67</span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Min Length</label>
              <input 
                type="range" 
                min="2" 
                max="10" 
                step="1" 
                defaultValue="4"
                onChange={(e) => handleParameterChange('minLength', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">4</span>
            </div>
          </div>
        )
      
      case 'mandelbrot':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Mandelbrot Set Parameters</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Max Iterations</label>
              <input 
                type="range" 
                min="50" 
                max="200" 
                step="10" 
                defaultValue="100"
                onChange={(e) => handleParameterChange('maxIterations', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">100</span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Zoom Level</label>
              <input 
                type="range" 
                min="1" 
                max="100" 
                step="1" 
                defaultValue="1"
                onChange={(e) => handleParameterChange('zoom', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">1x</span>
            </div>
          </div>
        )
      
      case 'ornstein_uhlenbeck':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Ornstein-Uhlenbeck Parameters</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Theta (Drift)</label>
              <input 
                type="range" 
                min="0.05" 
                max="0.5" 
                step="0.01" 
                defaultValue="0.15"
                onChange={(e) => handleParameterChange('theta', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">0.15</span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sigma (Noise)</label>
              <input 
                type="range" 
                min="0.1" 
                max="1.0" 
                step="0.05" 
                defaultValue="0.4"
                onChange={(e) => handleParameterChange('sigma', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">0.4</span>
            </div>
          </div>
        )
      
      case 'harmonic_waves':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Harmonic Waves Parameters</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Frequency X</label>
              <input 
                type="range" 
                min="0.005" 
                max="0.05" 
                step="0.001" 
                defaultValue="0.02"
                onChange={(e) => handleParameterChange('freqX', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">0.02</span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Frequency Y</label>
              <input 
                type="range" 
                min="0.005" 
                max="0.05" 
                step="0.001" 
                defaultValue="0.015"
                onChange={(e) => handleParameterChange('freqY', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">0.015</span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Amplitude</label>
              <input 
                type="range" 
                min="20" 
                max="150" 
                step="5" 
                defaultValue="80"
                onChange={(e) => handleParameterChange('amplitude', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">80</span>
            </div>
          </div>
        )
      
      case 'polar_rose':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Polar Rose Parameters</h3>
            <div>
              <label className="block text-sm font-medium mb-1">K (Petals)</label>
              <input 
                type="range" 
                min="3" 
                max="8" 
                step="0.1" 
                defaultValue="5"
                onChange={(e) => handleParameterChange('k', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">5</span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rotation Speed</label>
              <input 
                type="range" 
                min="0.001" 
                max="0.01" 
                step="0.0005" 
                defaultValue="0.003"
                onChange={(e) => handleParameterChange('rotationSpeed', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">0.003</span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Number of Roses</label>
              <input 
                type="range" 
                min="3" 
                max="8" 
                step="1" 
                defaultValue="6"
                onChange={(e) => handleParameterChange('numRoses', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">6</span>
            </div>
          </div>
        )
      
      case 'noise_field_sculpture':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Noise Field Sculpture Parameters</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Noise Scale</label>
              <input 
                type="range" 
                min="0.003" 
                max="0.03" 
                step="0.001" 
                defaultValue="0.01"
                onChange={(e) => handleParameterChange('noiseScale', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">0.01</span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Number of Contours</label>
              <input 
                type="range" 
                min="5" 
                max="20" 
                step="1" 
                defaultValue="12"
                onChange={(e) => handleParameterChange('numContours', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">12</span>
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