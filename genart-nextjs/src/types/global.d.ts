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
    updatePerlinLandscapeParameter?: (param: string, value: number) => void
    updateBoidsParameter?: (param: string, value: number) => void
    updateLissajousParameter?: (param: string, value: number | string) => void
    p5?: unknown
    remove?: () => void
    currentP5Instance?: { remove?: () => void } | null
    createCanvas?: unknown
    [key: string]: unknown
    gc?: () => void
  }
}

export {}