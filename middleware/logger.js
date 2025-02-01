const uuid = require("uuid");
const { format } = require("date-fns");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = async (message, logName) => {
  const dateTime = format(new Date(), "dd-MM-yyyy\tHH:mm:ss");
  const logItem = `${message}\t${uuid.v4()}\t${dateTime}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "log"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "log"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "log", logName),
      logItem
    );
  } catch (err) {
    console.log(err.message);
  }
};

const logger = (req, res, next) => {
  const message = `${req.method}\t${req.headers.origin}\t${req.url}`;
  logEvents(message, "reqLog.log");
  next();
};

module.exports = logger;
