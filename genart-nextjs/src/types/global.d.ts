declare global {
  interface Window {
    updateGrayScottParameter?: (param: string, value: number) => void
    updateFlowFieldParameter?: (param: string, value: number) => void
    updateWaveInterferenceParameter?: (param: string, value: number) => void
    updateRecursiveTreeParameter?: (param: string, value: number) => void
    updateMandelbrotParameter?: (param: string, value: number) => void
    p5?: any
    remove?: () => void
  }
}

export {}