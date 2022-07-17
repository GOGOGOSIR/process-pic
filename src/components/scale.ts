class Scale {
  scale: number
  private shift = false

  constructor(defaultScale: number) {
    this.scale = defaultScale
  }

  setShiftStatus(status: boolean) {
    this.shift = status
  }

  private handleKeydown = (event: KeyboardEvent) => {
    const { key } = event
    if (key.toLowerCase() === 'control') {
      console.log('触发了ctrl键')
      this.setShiftStatus(true)
    }
  }

  private handleKeyup = (event: KeyboardEvent) => {
    const { key } = event
    if (key.toLowerCase() === 'control') {
      console.log('up触发了ctrl键')
      this.setShiftStatus(false)
    }
  }

  init() {
    document.addEventListener('keydown', this.handleKeydown)
    document.addEventListener('keyup', this.handleKeyup)
  }

  destroy() {
    document.removeEventListener('keydown', this.handleKeydown)
    document.removeEventListener('keyup', this.handleKeyup)
  }
}

export default Scale
