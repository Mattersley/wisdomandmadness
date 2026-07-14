import { Inputs } from './types'

export const getStageFieldsToValidate = (stage: number): (keyof Inputs)[] => {
  switch (stage) {
    case 1:
      return ['name', 'email', 'phone']
    case 2:
      return ['services']
    case 3:
      return ['budget', 'timeline']
    case 4:
      return ['projectStatus']
    case 5:
      return ['inspiration']
    case 6:
      return [] // Stage 6 is optional; no static validation barrier enforced
    default:
      return []
  }
}
