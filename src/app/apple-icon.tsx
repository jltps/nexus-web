import { ImageResponse } from "next/og";
import { BRAND_MARK_DATA_URI } from "@/lib/brand-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — the Nexus orbit-node mark at 180×180. The mark carries its
 *  own rounded-square gradient ground. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img width={180} height={180} src={BRAND_MARK_DATA_URI} alt="Nexus" />
      </div>
    ),
    size,
  );
}
