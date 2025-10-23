import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>
            Part of Vineyard <br />
            Hotel Group
          </h3>
          <p>Experience the beauty of Tuscany</p>
          <p style={{ marginTop: "15px" }}>Via della Vigna 123</p>
          <p>53026 Pienza, Siena</p>
          <p>Tuscany, Italy</p>
        </div>

        <div className={styles.footerSection}>
          <h4>Contact</h4>
          <p>Phone: +39 123 456 789</p>
          <p>Email: info@villatoscany.com</p>
        </div>

        <div className={styles.footerSection}>
          <h4>Follow Us</h4>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="Facebook">
              Facebook
            </a>
            <a href="#" aria-label="Instagram">
              Instagram
            </a>
          </div>
        </div>

        <div className={styles.footerSection}>
          <img src="/logo.png" alt="Vineyard Hotel Logo" className={styles.logo} />
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2025 Vineyard Hotel. All rights reserved.</p>
      </div>
    </footer>
  );
}
