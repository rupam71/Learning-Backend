import { EventEmitter } from "events";

declare module "express-serve-static-core" {
  interface Request {
    eventEmitter?: EventEmitter;
  }
  interface Response {
    myField?: string;
  }
}
