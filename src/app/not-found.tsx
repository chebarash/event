import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: `flex`,
        flexDirection: `column`,
        padding: `0 10px`,
        gap: `var(--gapNarrow)`,
      }}
    >
      <h2 style={{ color: `var(--accent)`, fontSize: `48px` }}>404</h2>
      <h1>Not Found</h1>
      <p>Could not find requested resource</p>
      <Link
        href="/"
        style={{
          border: `2px solid var(--fg)`,
          background: `var(--bg)`,
          color: `var(--fg)`,
          fontFamily: `var(--fontTitle)`,
          padding: `12px 16px`,
          borderRadius: `10px`,
          textTransform: `uppercase`,
          lineHeight: 1,
          margin: `10px -10px`,
        }}
      >
        Return Home
      </Link>
    </div>
  );
}
