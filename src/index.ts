import { createConnection } from "typeorm";
import app from "./app"
import { port } from "./config";

(async function startApp() {
  await createConnection();
  app.listen(port);
  console.log(`Express server has started on port ${port}.`);
})();
