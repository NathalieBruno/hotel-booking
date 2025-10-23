import styles from "./AdminHeader.module.css";

function AdminHeader() {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.title}>Admin - Bookings dashboard</h1>
        <p className={styles.subtitle}>Overview and management of all reservations</p>
      </div>
      <div className={styles.icon} aria-hidden="true">
        📖
      </div>
    </header>
  );
}

export default AdminHeader;
