import { body } from "express-validator";
import {UserController} from "./controller/UserController";

export const Routes = [{
  method: "get",
  route: "/users",
  controller: UserController,
  validation: [],
  action: "all"
}, {
  method: "get",
  route: "/users/:id",
  controller: UserController,
  validation: [],
  action: "one"
}, {
  method: "post",
  route: "/users",
  controller: UserController,
  validation: [
    body('firstName').isString(),
    body('lastName').isString(),
    body('age').isInt({ min: 0 })
  ],
  action: "save"
}, {
  method: "delete",
  route: "/users/:id",
  controller: UserController,
  validation: [],
  action: "remove"
}];