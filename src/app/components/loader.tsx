import styles from "./loader.module.css";

export default function Loading() {
  return (
    <div className={styles.loading}>
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        className={styles.svg}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M63.7234 74.7525L77.5658 50L63.7234 25.2476H36.2771L22.4346 50L36.2771 74.7525H63.7234Z"
          fill="var(--accent)"
        />
      </svg>
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        className={styles.node}
      >
        <path
          d="M83.5322 10.1485L100 39.8515L77.5656 50L100 60.1485L83.5322 89.8515L63.7231 74.7525L66.5871 100H33.4129L36.2768 74.7525L16.4678 89.8515L0 60.1485L22.4344 50L0 39.8515L16.4678 10.1485L36.2768 25.2475L33.4129 0H66.5871L63.7231 25.2475L83.5322 10.1485Z"
          fill="var(--accent)"
        />
      </svg>
    </div>
  );
}
