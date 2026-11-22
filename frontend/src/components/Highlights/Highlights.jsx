import highlights from "../../data/highlights";
import styles from "./Highlights.module.css";

function Highlights() {
  return (
    <section className={styles.section} aria-labelledby="highlights-title">
      <h2 id="highlights-title" className={styles.title}>
        TUSCAN TREASURES
      </h2>

      <ul className={styles.grid} role="list">
        {highlights.map(({ title, text, image, alt }) => (
          <li key={title} className={styles.card}>
            <img src={image} alt={alt} className={styles.image} loading="lazy" />
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.text}>{text}</p>
          </li>
        ))}
      </ul>

      <div className={styles.divider} aria-hidden="true" />
    </section>
  );
}

export default Highlights;
