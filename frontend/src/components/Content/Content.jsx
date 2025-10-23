import styles from "./Content.module.css";

function Content() {
  return (
    <section className={styles.contentSection}>
      <div className={styles.contentContainer}>
        <div className={styles.imageSection}>
          <img src="/public/Vineyard-Dinner.webp" alt="Dinnertable in the hotel" className={styles.image} />
        </div>

        <div className={styles.textSection}>
          <div className={styles.header}>
            <h1 className={styles.title}>WINE & DINE</h1>
          </div>

          <div className={styles.content}>
            <h2 className={styles.subtitle}>BOOK A TABLE</h2>

            <p className={styles.introText}>
              Experience the very best of Tuscany surrounded by rolling vineyards and the scent of sun-ripened grapes.
              With us, food and wine come together to create unforgettable moments.
            </p>

            <p className={styles.introText}>
              Beneath the open sky, at long tables lined with glowing lights and vineyards as your backdrop, we serve
              authentic Tuscan dishes made with seasonal ingredients, perfectly paired with carefully selected wines
              from the region.
            </p>

            <p className={styles.introText}>
              Reserve your seat and let us take you on a culinary journey where nature provides the most beautiful
              setting.
            </p>

            <div className={styles.infoBox}>
              <h3 className={styles.infoTitle}>SERVING HOURS</h3>
              <p className={styles.infoText}>Wednesday–Friday: 18.00–23.00</p>
              <p className={styles.infoText}>Saturday–Sunday: 17.00–01.00</p>
              <p className={styles.price}>PRICE: From 120 EUR/person</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Content;
