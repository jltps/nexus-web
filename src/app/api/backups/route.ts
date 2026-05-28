import { phase2Stub } from "@/lib/stub-response";
import { BackupBundleSchema } from "@shared/api-contract";

export const runtime = "nodejs";

export const GET = (req: Request) =>
  phase2Stub(req, { name: "Backups (list)" });

export const POST = (req: Request) =>
  phase2Stub(req, {
    name: "Backup upload",
    schema: BackupBundleSchema,
    docsAnchor: "backup",
  });
