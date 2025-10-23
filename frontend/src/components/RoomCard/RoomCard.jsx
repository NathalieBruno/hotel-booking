import styles from "./RoomCard.module.css";

export default function RoomCard({ title, description, price, image, onBook }) {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p className={styles.description}>{description}</p>
      <p className={styles.price}>{price}</p>
      <div className={styles.decor}>
        <button onClick={() => onBook(title)}>Book room</button>
      </div>
    </div>
  );
}
