import styles from "./calendar.module.css";

export default function Calendar() {
  const date = new Date();
  const list = [];

  for (let i = 0; i < 10; i++) {
    let thisDay = new Date(date);
    thisDay.setDate(date.getDate() + i);
    list.push(
      <li
        className={
          [6, 0].includes(thisDay.getDay()) ? styles.weekend : styles.li
        }
      >
        <p className={styles.day}>
          {thisDay.toLocaleDateString(`en`, { weekday: `short` }).slice(0, 2)}
        </p>
        <p className={styles.date}>{thisDay.getDate()}</p>
      </li>
    );
  }

  return (
    <section className={styles.section}>
      <p className={styles.title}>
        {date.toLocaleString(`en`, { month: `long` })}
      </p>
      <ul className={styles.list}>{list}</ul>
    </section>
  );
}
