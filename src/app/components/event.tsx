import styles from "./event.module.css";

export default function Event({
  category,
  title,
  date,
  img,
  id,
}: {
  category: string;
  title: string;
  date: string;
  img: string;
  id: string;
}) {
  return (
    <section className={styles.event}>
      <span>
        <p>{category}</p>
        <img src={img} alt={title} />
      </span>
      <div>
        <div className={styles.box}>
          <p className={styles.title}>{title}</p>
          <p className={styles.date}>{date}</p>
        </div>
        <div className={styles.arrow}>
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
            <path
              d="M3 16L17 2M17 2V16M17 2H3"
              stroke="var(--bg)"
              strokeWidth="4"
              strokeLinecap="square"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
