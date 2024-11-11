enum Arrows {
  down = 'ArrowDown',
  up = 'ArrowUp',
  left = 'ArrowLeft',
  right = 'ArrowRight',
}

enum Page {
  up = 'PageUp',
  down = 'PageDown'
}

const focusAssign = (value: number): void => {
  const focusable: NodeListOf<HTMLButtonElement | HTMLInputElement | HTMLTextAreaElement> = document.querySelectorAll(
    'button'
  )
  
  if (document.activeElement?.nodeName !== 'BUTTON') {
    focusable[0].focus()  
    return
  }

  let index = 0;
  focusable.forEach((item, idx) => {
    if (item === document.activeElement) {
      index = idx
    }
  })

  const move = {
    value: 0
  }
  if (value > 0) {
    move.value = index + value > focusable.length - 1 ? 0 : index + value
  } else {
    move.value = index + value < 0 ? focusable.length - 1 : index + value
  }
  focusable[move.value].focus()
}

const focusBack = (): void => {
  focusAssign(-1) 
}

const focusForward = (): void => {
  focusAssign(1) 
}

const causeOnClick = (): void => {
  const focusable: NodeListOf<HTMLButtonElement | HTMLInputElement | HTMLTextAreaElement> = document.querySelectorAll(
    'button'
  )
  
  if (document.activeElement?.nodeName !== 'BUTTON') {
    focusable[0].focus()  
    return
  }

  let index = 0;
  focusable.forEach((item, idx) => {
    if (item === document.activeElement) {
      index = idx
    }
  })

  focusable[index].click()
}

export const handleKeyPress = (event: KeyboardEvent): void => {
  console.log(event)
  switch (event.key) {
    case Arrows.down:
      focusForward()
      break
    case Arrows.right:
      focusForward()
      break
    case Arrows.up:
      focusBack()
      break
    case Arrows.left:
      focusBack()
      break
    case Page.up:
      console.log('H')
      causeOnClick()
      break
    case Page.down:
      focusBack()
      break
  }
};