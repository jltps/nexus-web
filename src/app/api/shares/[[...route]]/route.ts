import { phase2Stub } from "@/lib/stub-response";
import { CreateShareRequestSchema } from "@shared/api-contract";

export const runtime = "nodejs";

export const GET = (req: Request) => phase2Stub(req, { name: "Shares (list)" });

export const POST = (req: Request) =>
  phase2Stub(req, {
    name: "Share create",
    schema: CreateShareRequestSchema,
    docsAnchor: "shares",
  });

export const DELETE = (req: Request) =>
  phase2Stub(req, { name: "Share delete" });
