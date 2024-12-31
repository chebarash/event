"use client";

import styles from "./greeting.module.css";
import useUser from "@/hooks/useUser";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getDayWithSuffix = (day: number) => {
  const suffix = ["th", "st", "nd", "rd"];
  const value = day % 100;
  return day + (suffix[(value - 20) % 10] || suffix[value] || suffix[0]);
};

export default function Greeting() {
  const date = new Date();
  const month = monthNames[date.getMonth()];
  const day = getDayWithSuffix(date.getDate());
  const { user, loading } = useUser();
  return (
    <div className={styles.greeting}>
      <p className={styles.today}>
        Today’s {month} {day}
      </p>
      <p className={styles.name}>
        {user || loading
          ? `Welcome${user ? `, ${user.name.split(` `)[0]}` : ``}!`
          : `Login to use`}
      </p>
    </div>
  );
}
