import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #10b981 0%, #0f766e 100%)",
          borderRadius: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 120,
          fontWeight: 700,
          letterSpacing: -4,
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
        }}
      >
        N
      </div>
    ),
    size,
  );
}
