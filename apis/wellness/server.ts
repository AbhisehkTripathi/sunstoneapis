import express from "express";
import client from "prom-client";
import { monitorEventLoopDelay } from "perf_hooks";

const app = express();
const PORT = process.env.PORT || 3001;

const h = monitorEventLoopDelay({ resolution: 10 });
h.enable();

const register = new client.Registry();
register.registerMetric(new client.Gauge({
  name: 'sunstone_wellness_event_loop_delay_ms',
  help: 'Sunstone Wellness Event Loop Delay in ms',
  collect() { this.set(h.mean / 1e6); } // ns → ms
}));

client.collectDefaultMetrics({ register });

app.get("/", (req, res) => res.send(`Sunstone Wellness running`));

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => console.log(`Sunstone Wellness running on port ${PORT}`));
