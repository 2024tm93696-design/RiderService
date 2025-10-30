const { createLogger, format, transports } = require("winston");

const { combine, timestamp, colorize, printf, errors } = format;

// Define a readable format
const prettyFormat = printf(({ level, message, timestamp, correlationId, stack, ...meta }) => {
  let log = `${timestamp} [${level}]`;
  if (correlationId) log += ` [${correlationId}]`;
  log += `: ${message}`;

  if (stack) log += `\nStack: ${stack}`;
  if (Object.keys(meta).length > 0) log += `\n${JSON.stringify(meta, null, 2)}`;
  return log;
});

const logger = createLogger({
  level: "info",
  format: combine(
    errors({ stack: true }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    colorize({ all: true }),
    prettyFormat
  ),
  transports: [new transports.Console()],
});

module.exports = logger;
