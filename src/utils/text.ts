export const capitalize = (text: string): string => {
  return text.substring(0, 1).toUpperCase() + text.substring(1)
}

export const trunc = (text: string, val: number): string => {
  if (text.length > val) {
    return text.substring(0, val) + '...'
  }
  return text
}
