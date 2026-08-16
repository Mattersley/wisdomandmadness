export type Eggs = {
  eggs: number
  eggList: {
    id: number
    name: string
    found: boolean
  }[]
}

export type EggContextType = {
  eggs: Eggs
  eggFound: (id: number) => void
  resetEggCount: () => void
}

export type EggAction =
  | { type: 'eggFound', id: number }
  | { type: 'removeEggs' }
