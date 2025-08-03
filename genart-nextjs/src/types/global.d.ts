declare global {
  interface Window {
    updateGrayScottParameter?: (param: string, value: number) => void
    updateFlowFieldParameter?: (param: string, value: number) => void
    updateWaveInterferenceParameter?: (param: string, value: number) => void
    updateRecursiveTreeParameter?: (param: string, value: number) => void
    updateMandelbrotParameter?: (param: string, value: number) => void
    updateOrnsteinUhlenbeckParameter?: (param: string, value: number) => void
    updateHarmonicWavesParameter?: (param: string, value: number) => void
    updatePolarRoseParameter?: (param: string, value: number) => void
    updateNoiseFieldSculptureParameter?: (param: string, value: number) => void
    p5?: unknown
    remove?: () => void
    currentP5Instance?: unknown
    createCanvas?: unknown
    [key: string]: unknown
    gc?: () => void
  }
}

export {}