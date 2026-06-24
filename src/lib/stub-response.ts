import { NextResponse } from "next/server";
import type { ZodTypeAny } from "zod";
import type { PhaseStubResponse } from "@shared/api-contract";

/** 501-with-validation helper shared by every Phase-2 stub route.
 *  Validates the request body (if a schema is given) so that the wire
 *  format is enforced from day one — even though the handler does no
 *  real work yet. */
export async function phase2Stub(
  request: Request,
  options: {
    name: string;
    schema?: ZodTypeAny;
    docsAnchor?: string;
  },
): Promise<NextResponse> {
  if (options.schema && request.method !== "GET") {
    try {
      const json = await request.json();
      const result = options.schema.safeParse(json);
      if (!result.success) {
        return NextResponse.json(
          {
            error: "validation_error",
            issues: result.error.issues,
          },
          { status: 400 },
        );
      }
    } catch {
      return NextResponse.json(
        { error: "invalid_json", message: "Request body must be valid JSON." },
        { status: 400 },
      );
    }
  }
  const payload: PhaseStubResponse = {
    status: 501,
    error: "not_implemented",
    phase: 2,
    message: `${options.name} is part of Phase 2 (accounts & sync) and not yet implemented. See API_CONTRACT.md.`,
    docs: options.docsAnchor
      ? `https://nexus-web-joses-projects-64c7bb4d.vercel.app/docs#${options.docsAnchor}`
      : undefined,
  };
  return NextResponse.json(payload, { status: 501 });
}
