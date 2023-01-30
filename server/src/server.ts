import Fastify from "fastify";
import cors from "@fastify/cors";

import { appRoutes } from "./routes";

const app = Fastify();

app.register(cors, {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
});
app.register(appRoutes);

const port = 5500;

app
  .listen({
    port,
  })
  .then(() => {
    console.log(`Listening on port ${5500}`);
  });
