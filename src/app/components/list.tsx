import styles from "./list.module.css";
import { EventType } from "../types/types";
import Event from "./event";

export default function List({
  day,
  events,
}: {
  day: number;
  events: Array<EventType>;
}) {
  const list = events.filter(
    ({ date }) =>
      new Date(Date.now() + 1000 * 60 * 60 * 24 * day).toDateString() ==
      new Date(date).toDateString()
  );

  return (
    <>
      {list.length ? (
        list.map((event) => <Event {...event} key={event._id} />)
      ) : (
        <p className={styles.no}>No Events</p>
      )}
    </>
  );
}
