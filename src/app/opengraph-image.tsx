import { ImageResponse } from "next/og";
import { BRAND_MARK_DATA_URI } from "@/lib/brand-mark";

export const alt = "Nexus — bot-free meeting notepad for Windows & macOS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0f",
          color: "#e7e7ee",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
          display: "flex",
          flexDirection: "column",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img width={72} height={72} src={BRAND_MARK_DATA_URI} alt="Nexus" />
          <div style={{ fontSize: 36, fontWeight: 600 }}>Nexus</div>
        </div>
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            Capture your full meeting.
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.05,
              color: "#8b7bff",
            }}
          >
            Never let a bot join the call.
          </div>
          <div style={{ marginTop: 32, fontSize: 28, color: "#9a9aa7" }}>
            Bot-free meeting notepad for Windows & macOS · Local-first · BYO
            keys
          </div>
        </div>
      </div>
    ),
    size,
  );
}
