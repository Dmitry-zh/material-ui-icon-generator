import winston, { LoggerOptions, format } from 'winston'

export const config: LoggerOptions = {
  level: 'info',
  format: format.combine(format.splat(), format.colorize()),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
}
