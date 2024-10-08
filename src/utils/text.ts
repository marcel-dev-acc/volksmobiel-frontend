export const capitalize = (text: string) => {
  return text.substring(0, 1).toUpperCase() + text.substring(1)
}

export const trunc = (text: string, val: number) => {
  if (text.length > val) {
    return text.substring(0, val) + '...'
  }
  return text
}