import Calendar from "./components/calendar";
import Event from "./components/event";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Calendar />
      {Array(10).fill(
        <Event
          title="Gifted Hands for ACS"
          category="Movie Night"
          date="14:00"
          id="424"
          img="https://movieguide.b-cdn.net/wp-content/uploads/2014/05/Gifted-Hands-Review-Slider.jpg"
        />
      )}
    </main>
  );
}
