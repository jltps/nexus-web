import { phase2Stub } from "@/lib/stub-response";
import { AuthSignInRequestSchema } from "@shared/api-contract";

export const runtime = "nodejs";

export const GET = (req: Request) =>
  phase2Stub(req, { name: "Authentication" });

export const POST = (req: Request) =>
  phase2Stub(req, {
    name: "Authentication",
    schema: AuthSignInRequestSchema,
    docsAnchor: "auth",
  });
