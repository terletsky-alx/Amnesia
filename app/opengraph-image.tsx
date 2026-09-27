import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Amnesia — The AI that knows how to forget";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// English text only: satori's default font stack has no Cyrillic glyphs.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0e1a",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(34,211,238,0.18), transparent 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            padding: "20px 36px",
            borderRadius: 24,
            border: "2px solid rgba(34,211,238,0.4)",
            background: "rgba(34,211,238,0.06)",
            color: "#22d3ee",
            fontSize: 56,
            fontWeight: 700,
          }}
        >
          A
        </div>
        <div
          style={{
            marginTop: 40,
            color: "#f8fafc",
            fontSize: 72,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          The AI that knows how to forget
        </div>
        <div
          style={{
            marginTop: 24,
            color: "#94a3b8",
            fontSize: 32,
            textAlign: "center",
          }}
        >
          Privacy-first AI · 100% local · 0 trackers · GDPR compliant
        </div>
      </div>
    ),
    { ...size },
  );
}
