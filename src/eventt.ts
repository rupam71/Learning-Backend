import { EventEmitter } from "events";
import ApplicationLog from "./service/log/model";
const eventEmitter = new EventEmitter();

eventEmitter.on("LOGEVENT", (data) => {
  try {
    if (data?.uuid) {
      const log = new ApplicationLog(data);
      log.save();
    }
  } catch (error) {
    console.log({ error });
  }
});

export default eventEmitter;
