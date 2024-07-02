import styles from "./toast.module.css";

export default function Toast({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.toast}>{children}</div>;
}
