/**
 * Nexus web API contract — Zod schemas shared by route handlers and any
 * consumer (the Electron app, the docs site).
 *
 * This file imports nothing from `next`, `react`, or `node:*` so it can also
 * be imported into the desktop app's `shared/` layer if we ever want a
 * single source of truth across both repos. Today they are mirrored: when
 * the app schema bumps, update both.
 *
 * Live endpoints in Phase 1:
 *   GET /api/updates/latest        → UpdatesLatestResponse
 *   GET /api/updates/latest.yml    → electron-updater YAML (same shape, YAML-encoded)
 *
 * Stub endpoints in Phase 1 (return 501 with `PhaseStubResponse`):
 *   POST   /api/auth/sign-in       → AuthSignInRequest
 *   POST   /api/auth/sign-out
 *   POST   /api/sync/pull          → SyncPullRequest
 *   POST   /api/sync/push          → SyncPushRequest
 *   POST   /api/backups            → BackupBundle (CREATE)
 *   GET    /api/backups/:id
 *   POST   /api/shares             → CreateShareRequest
 *   GET    /api/shares/me
 *   DELETE /api/shares/:id
 *   POST   /api/telemetry          → TelemetryEvent
 */

import { z } from "zod";

/* ----------------------------- Updates (LIVE) ---------------------------- */

export const UpdatesLatestResponseSchema = z.object({
  /** Semver, e.g. "0.7.0". Matches the GitHub release tag with leading "v" stripped. */
  version: z.string().regex(/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/),
  /** ISO-8601 UTC, e.g. "2026-05-28T13:45:00.000Z". electron-updater is strict. */
  releaseDate: z.string().datetime({ offset: true }),
  /** Direct URL to the .exe asset on GitHub Releases. */
  url: z.string().url(),
  /** Base64-encoded SHA-512 of the .exe (electron-updater format, not hex). */
  sha512: z.string().min(1),
  /** Filename of the installer, relative to the release URL base. */
  path: z.string().min(1),
  /** Markdown release notes. May be empty. */
  notes: z.string().default(""),
});
export type UpdatesLatestResponse = z.infer<typeof UpdatesLatestResponseSchema>;

/* ------------------------------- Phase-2 stubs --------------------------- */

export const PhaseStubResponseSchema = z.object({
  status: z.literal(501),
  error: z.literal("not_implemented"),
  phase: z.literal(2),
  message: z.string(),
  docs: z.string().url().optional(),
});
export type PhaseStubResponse = z.infer<typeof PhaseStubResponseSchema>;

/* Auth */
export const AuthSignInRequestSchema = z.object({
  method: z.enum(["magic-link", "google", "microsoft"]),
  email: z.string().email().optional(),
  redirectUri: z.string().url().optional(),
});
export type AuthSignInRequest = z.infer<typeof AuthSignInRequestSchema>;

/* Sync — delta semantics; last-write-wins by `updatedAt`. Tombstones for deletes. */
export const SyncPullRequestSchema = z.object({
  lastPulledAt: z.string().datetime({ offset: true }).optional(),
  scope: z
    .object({
      folderId: z.string().uuid().optional(),
      since: z.string().datetime({ offset: true }).optional(),
    })
    .optional(),
});
export type SyncPullRequest = z.infer<typeof SyncPullRequestSchema>;

const SyncTombstoneSchema = z.object({
  table: z.enum([
    "meetings",
    "notes",
    "transcript_segments",
    "speaker_names",
    "templates",
    "folders",
    "tags",
    "meeting_tags",
  ]),
  id: z.string().uuid(),
  deletedAt: z.string().datetime({ offset: true }),
});

export const SyncPushRequestSchema = z.object({
  updates: z.array(z.record(z.string(), z.unknown())),
  tombstones: z.array(SyncTombstoneSchema).default([]),
});
export type SyncPushRequest = z.infer<typeof SyncPushRequestSchema>;

/* Backup — mirrors scribe/src/shared/ipc-contract.ts BackupBundleSchema v2.
 * Updated 2026-05-28; must be re-mirrored when the app schema bumps.
 * IMPORTANT: This schema MUST NOT contain `api_keys` or `oauth_tokens`
 * fields — the §1.2 invariant requires keys to stay in safeStorage and
 * never serialize. */
export const BackupBundleSchema = z.object({
  version: z.literal(2),
  exportedAt: z.string().datetime({ offset: true }),
  meetings: z.array(z.record(z.string(), z.unknown())),
  notes: z.array(z.record(z.string(), z.unknown())),
  transcriptSegments: z.array(z.record(z.string(), z.unknown())),
  speakerNames: z.array(z.record(z.string(), z.unknown())),
  templates: z.array(z.record(z.string(), z.unknown())),
  folders: z.array(z.record(z.string(), z.unknown())),
  tags: z.array(z.record(z.string(), z.unknown())),
  meetingTags: z.array(z.record(z.string(), z.unknown())),
});
export type BackupBundle = z.infer<typeof BackupBundleSchema>;

/* Shares — read-only first; comments/co-editing later. */
export const CreateShareRequestSchema = z.object({
  meetingId: z.string().uuid(),
  recipient: z.union([
    z.object({ kind: z.literal("email"), email: z.string().email() }),
    z.object({ kind: z.literal("link") }),
  ]),
  permission: z.literal("read").default("read"),
  expiresAt: z.string().datetime({ offset: true }).optional(),
});
export type CreateShareRequest = z.infer<typeof CreateShareRequestSchema>;

/* Telemetry — opt-in. Off by default. */
export const TelemetryEventSchema = z.object({
  kind: z.enum(["usage", "error", "feature_adoption"]),
  name: z.string().min(1).max(64),
  /** Free-form structured payload. MUST NOT include identifiers,
   *  transcript text, note text, audio, or API keys. */
  context: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])),
  ts: z.string().datetime({ offset: true }),
});
export type TelemetryEvent = z.infer<typeof TelemetryEventSchema>;
