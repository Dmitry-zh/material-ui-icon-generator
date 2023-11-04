import startCase from 'lodash/startCase'

export const pascalCase = (str?: string): string => {
  if (!str && typeof str !== 'string') {
    throw new Error('String must be provided')
  }

  return startCase(str).split(' ').join('')
}
