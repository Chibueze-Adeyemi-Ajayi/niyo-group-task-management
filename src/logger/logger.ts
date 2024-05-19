import "winston-daily-rotate-file";
import winston from "winston";
import { yellow, blue, green, red, gray } from "kleur";

const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
  filename: "application-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  level: "info",
});

const coloredTransport = new winston.transports.Console({
  level: "info",
  format: winston.format.printf(({ level, message, timestamp }) => {
    let color;
    switch (level) {
      case "info":
        color = blue;
        break;
      case "warn":
        color = yellow;
        break;
      case "error":
        color = red;
        break;
      default:
        color = gray;
    }
    return `${color(level)}: ${message} ${color(new Date().toISOString())}`;
  }),
});

export const logger = winston.createLogger({
  transports: [/*dailyRotateFileTransport,*/ coloredTransport],
});

// time runner cron for checking server heart-beat
setInterval(() => logger.info("Every 60 seconds heart beat"), 1000 * 60)