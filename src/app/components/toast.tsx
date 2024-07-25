import styles from "./toast.module.css";

export default function Toast({
  children,
  error,
}: Readonly<{
  children: React.ReactNode;
  error: boolean;
}>) {
  return (
    <div
      className={[styles.toast, error ? styles.error : styles.default].join(
        ` `
      )}
    >
      {children}
    </div>
  );
}
