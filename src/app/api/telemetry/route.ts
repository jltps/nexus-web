import { phase2Stub } from "@/lib/stub-response";
import { TelemetryEventSchema } from "@shared/api-contract";

export const runtime = "nodejs";

export const POST = (req: Request) =>
  phase2Stub(req, {
    name: "Telemetry",
    schema: TelemetryEventSchema,
    docsAnchor: "telemetry",
  });
