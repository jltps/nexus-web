import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** App icon — small Nexus mark on the teal gradient. Generated at request
 *  time on the edge; cached aggressively by Next. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #10b981 0%, #0f766e 100%)",
          borderRadius: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: -1,
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
        }}
      >
        N
      </div>
    ),
    size,
  );
}
