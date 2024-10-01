import { Hono } from "hono";
import Webhook from "./webhook/Webhook";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/webhook", async (c) => {
  return await Webhook(c);
});

export default app;
