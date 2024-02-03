import { EventEmitter } from "events";
import ApplicationLog from "./service/log/model";
const eventEmitter = new EventEmitter();

eventEmitter.on("LOGEVENT", (data) => {
  const log = new ApplicationLog(data);
  log.save();
});

export default eventEmitter;
