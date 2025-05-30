import { EggAction, Eggs } from '@/context/eggContext.types'

const eggReducer = (eggs: Eggs, action: EggAction) => {
  switch (action.type) {
    case 'eggFound': {
      const foundEgg = eggs.eggList.find(egg => egg.id === action.id)
      if (!foundEgg || foundEgg.found) {
        return eggs
      }

      return {
        eggs: eggs.eggs + 1,
        eggList: eggs.eggList.map(egg =>
          egg.id === action.id
            ? { ...egg, found: true }
            : { ...egg }
        )
      }

    }

    case 'removeEggs': {
      return {
        eggs: 0,
        eggList: eggs.eggList.map(egg => ({
          ...egg,
          found: false
        }))
      }

    }

    default: {
      return eggs
    }
  }
}

export default eggReducer
