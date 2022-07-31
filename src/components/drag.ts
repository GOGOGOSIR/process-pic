// 节流函数
// function throttle(
//   func: (...args: any) => void,
//   delay = 500
// ): (...args: any) => void {
//   let timeout: any = null
//   return function(this: any, ...args: any) {
//     if (timeout)
//       return

//     timeout = setTimeout(() => {
//       func.apply(this, args)
//       clearTimeout(timeout)
//       timeout = null
//     }, delay)
//   }
// }

class Drag {
  el: HTMLElement
  scaleEl: HTMLElement

  private mouseData = {
    isDown: false // 是否触发mousedown

  }

  private limitScroll = {
    x: 0,
    y: 0
  }

  constructor(el: HTMLElement, scaleEl: HTMLElement) {
    this.el = el
    this.scaleEl = scaleEl
    this.init()
  }

  private handleMousedown = () => {
    this.mouseData = {
      isDown: true

    }
    console.log(this.limitScroll, 'start')
  }

  // private handleMousemove = throttle((event: MouseEvent) => {
  //   event.preventDefault()
  //   if (!this.mouseData.isDown)
  //     return

  //   const {
  //     movementY,
  //     movementX
  //   } = event

  //   this.el.scrollTop = this.el.scrollTop - movementY * 1
  //   this.el.scrollLeft = this.el.scrollLeft - movementX * 1
  // }, 0)

  private handleMousemove = (event: MouseEvent) => {
    event.preventDefault()
    if (!this.mouseData.isDown)
      return

    const {
      movementY,
      movementX
    } = event

    this.el.scrollTop = this.el.scrollTop - movementY * 1
    this.el.scrollLeft = this.el.scrollLeft - movementX * 1
  }

  private handleMouseup = (event: MouseEvent) => {
    console.log(event, 'up')
    this.mouseData = {
      isDown: false

    }
  }

  private init() {
    this.el.addEventListener('mousedown', this.handleMousedown)
    this.el.addEventListener('mousemove', this.handleMousemove)
    document.addEventListener('mouseup', this.handleMouseup)
  }

  destroy() {
    this.el.removeEventListener('mousedown', this.handleMousedown)
    this.el.removeEventListener('mousemove', this.handleMousemove)
    document.removeEventListener('mouseup', this.handleMouseup)
  }
}

export type DragInstance = InstanceType<typeof Drag>

export default Drag
