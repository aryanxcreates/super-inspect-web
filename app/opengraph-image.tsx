import { ImageResponse } from "next/og";

export const alt = "InspectMode Pro — design toolkit for the web";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #18181b 0%, #3f3f46 45%, #18181b 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 48,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: -1,
              color: "#fafafa",
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            InspectMode Pro
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 500,
              color: "#a1a1aa",
              marginTop: 20,
              textAlign: "center",
              maxWidth: 720,
              lineHeight: 1.35,
            }}
          >
            Inspect elements, extract assets, pick colors, and analyze fonts — in your browser.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
