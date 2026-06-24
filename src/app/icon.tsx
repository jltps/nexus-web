import { ImageResponse } from "next/og";
import { BRAND_MARK_DATA_URI } from "@/lib/brand-mark";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** App icon — the Nexus orbit-node mark. The mark SVG already carries its own
 *  rounded-square gradient ground, so we just rasterize it at icon size.
 *  Generated at request time and cached aggressively by Next. */
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img width={32} height={32} src={BRAND_MARK_DATA_URI} alt="Nexus" />
      </div>
    ),
    size,
  );
}
