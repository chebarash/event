import styles from "./event.module.css";

export default function Event({
  category,
  title,
  date,
  id,
}: {
  category: string;
  title: string;
  date: string;
  id: string;
}) {
  return (
    <section className={styles.event}>
      <span>
        <p>{category}</p>
        <img src="Sdsds" alt="dsds" />
      </span>
      <div>
        <div>
          <p>{title}</p>
          <p>{date}</p>
        </div>
        <div>
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
            <path
              d="M3 16L17 2M17 2V16M17 2H3"
              stroke="var(--bg)"
              stroke-width="4"
              stroke-linecap="square"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
