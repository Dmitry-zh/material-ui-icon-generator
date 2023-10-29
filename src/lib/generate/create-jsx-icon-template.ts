import { SvgTree } from '../../types'

interface CreateJsxIconTemplateParams {
  iconName: string
  elements: SvgTree['children']
}

export const createJsxIconTemplate = ({
  iconName,
  elements,
}: CreateJsxIconTemplateParams): string => {
  return `
import {jsx} from 'react/jsx-runtime'
import {createSvgIcon} from '@mui/material'

export default createSvgIcon([
${elements.map(
  (el, index) => `
jsx(
 '${el.tag}',
 ${JSON.stringify(el.attributes)},
 '${index}'
)
`,
)}
], '${iconName}')
`
}
