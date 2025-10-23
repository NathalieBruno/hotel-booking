import styles from "./Hero.module.css";

function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroLeft}></div>
      <div className={styles.heroRight}></div>
      <div className={styles.heroContainer}>
        <h1>
          VILLA
          <br /> TOSCANY
        </h1>
        <p>
          Stay among vineyards and olive groves – <br /> an authentic experience of Tuscan life.
        </p>
      </div>
    </div>
  );
}

export default Hero;
