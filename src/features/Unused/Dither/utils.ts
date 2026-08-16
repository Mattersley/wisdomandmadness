export function cn(...inputs: (string | boolean | undefined | null | { [key: string]: any })[]) {
  const classes: string[] = []

  for (const input of inputs) {
    if (!input) continue

    if (typeof input === 'string') {
      classes.push(input)
    } else if (Array.isArray(input)) {
      // Recursion if needed, though inputs is already flattened by ...args in many cases
      const inner = cn(...input)
      if (inner) classes.push(inner)
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key)
      }
    }
  }

  return classes.filter(Boolean).join(' ')
}
