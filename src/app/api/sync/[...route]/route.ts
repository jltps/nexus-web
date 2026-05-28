import { phase2Stub } from "@/lib/stub-response";
import {
  SyncPullRequestSchema,
  SyncPushRequestSchema,
} from "@shared/api-contract";

export const runtime = "nodejs";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ route: string[] }> },
) {
  const { route } = await params;
  const op = route[0];
  if (op === "pull") {
    return phase2Stub(req, {
      name: "Sync pull",
      schema: SyncPullRequestSchema,
      docsAnchor: "sync",
    });
  }
  if (op === "push") {
    return phase2Stub(req, {
      name: "Sync push",
      schema: SyncPushRequestSchema,
      docsAnchor: "sync",
    });
  }
  return phase2Stub(req, { name: `Sync (${op ?? "unknown"})` });
}
