declare global {
  interface Window {
    updateGrayScottParameter?: (param: string, value: number) => void
    p5?: any
    remove?: () => void
  }
}

export {}