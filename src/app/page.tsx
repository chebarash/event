import Event from "./event";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Event title="Test" category="Test" date="2:00 am" id="424" />
    </main>
  );
}
