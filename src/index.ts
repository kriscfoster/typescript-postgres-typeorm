import "reflect-metadata";
import { createConnection } from "typeorm";
import { port } from './config';
import app from './app';

createConnection().then(async connection => {
  app.listen(port);
  console.log(`Express server has started on port ${port}.`);
}).catch(error => console.log(error));
