import styles from "./loader.module.css";

export default function Loading() {
  return (
    <svg
      className={styles.svg}
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M63.7231 74.7525L77.5656 50L63.7231 25.2475H36.2768L22.4344 50L36.2768 74.7525H63.7231Z"
        fill="var(--accent)"
      />
      <path
        className={styles.node}
        d="M0 39.8515L22.4344 50L36.2768 25.2475L16.4678 10.1485L0 39.8515Z"
        fill="var(--accent)"
      />
      <path
        className={styles.node}
        d="M33.4129 0L36.2768 25.2475H63.7231L66.5871 0H33.4129Z"
        fill="var(--accent)"
      />
      <path
        className={styles.node}
        d="M100 39.8515L83.5322 10.1485L63.7231 25.2475L77.5656 50L100 39.8515Z"
        fill="var(--accent)"
      />
      <path
        className={styles.node}
        d="M100 60.1485L77.5656 50L63.7231 74.7525L83.5322 89.8515L100 60.1485Z"
        fill="var(--accent)"
      />
      <path
        className={styles.node}
        d="M66.5871 100L63.7231 74.7525H36.2768L33.4129 100H66.5871Z"
        fill="var(--accent)"
      />
      <path
        className={styles.node}
        d="M16.4678 89.8515L36.2768 74.7525L22.4344 50L0 60.1485L16.4678 89.8515Z"
        fill="var(--accent)"
      />
    </svg>
  );
}
