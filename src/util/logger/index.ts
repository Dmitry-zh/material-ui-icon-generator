import { createLogger } from 'winston'

import { config } from './config'

export const logger = createLogger(config)
