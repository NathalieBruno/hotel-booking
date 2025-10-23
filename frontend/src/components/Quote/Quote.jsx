import styles from "./Quote.module.css";

function Quote({ subtitle, text, author }) {
  return (
    <section className={styles.quoteSection}>
      <div className={styles.quoteContainer}>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <blockquote className={styles.quote}>
          <p className={styles.quoteText}>{text}</p>
        </blockquote>
        {author && <cite className={styles.author}>— {author}</cite>}
      </div>
    </section>
  );
}

export default Quote;
