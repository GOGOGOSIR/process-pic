// 视口居中
export const scrollToCenter = (targetDom: HTMLElement) => {
  const layout = document.querySelector('.flow-design')
  const documentWidth = document.body.clientWidth
  // const documentHeight = document.body.clientHeight
  if (layout) {
    const { right, top } = targetDom.getBoundingClientRect()
    const deltaX = right - documentWidth
    const deltaY = top
    const scrollLeft = Math.max(0, layout.scrollLeft + deltaX)
    const scrollTop = Math.max(0, layout.scrollTop + deltaY)

    layout.scrollTo({
      top: scrollTop,
      left: scrollLeft,
      behavior: 'smooth'
    })
  }
}
