import { ImageResponse } from "next/og";

export const alt = "Nexus — bot-free meeting notepad for Windows";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          color: "#e5e5e5",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
          display: "flex",
          flexDirection: "column",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              background: "linear-gradient(135deg, #10b981 0%, #0f766e 100%)",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 48,
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            N
          </div>
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
              color: "#2dd4bf",
            }}
          >
            Never let a bot join the call.
          </div>
          <div style={{ marginTop: 32, fontSize: 28, color: "#a3a3a3" }}>
            Bot-free meeting notepad for Windows · Local-first · Bring your
            own keys
          </div>
        </div>
      </div>
    ),
    size,
  );
}
