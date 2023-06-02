import logger, { Logger } from 'pino';
import dayjs from 'dayjs';

const log: Logger = logger({
  transport: {
    target: 'pino-pretty',
  },
  base: {
    pid: false,
  },
  timestamps: () => `,"Time": "${dayjs().format()}"`,
});

export default log;
