import styles from "./DemoBanner.module.css";

function DemoBanner() {
  return (
    <div className={styles.banner}>
      <strong>Demo version</strong> – bookings are not saved and reset when the page is reloaded.
    </div>
  );
}

export default DemoBanner;
