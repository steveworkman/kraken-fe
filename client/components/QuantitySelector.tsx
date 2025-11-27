import styles from "../styles/QuantitySelector.module.css";

interface QuantitySelectorProps {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string;
}

export default function QuantitySelector({
  value,
  onIncrease,
  onDecrease,
  className,
}: QuantitySelectorProps) {
  return (
    <div
      className={`${styles.quantitySelector}${
        className ? ` ${className}` : ""
      }`}
    >
      {/* I think this would be better as a label element */}
      <small className={styles.quantityLabel}>Qty</small>
      <button
        className={`${styles.quantityBtn} ${styles.quantityDecrement}`}
        onClick={onDecrease}
        disabled={value <= 1}
        type="button"
        title="Decrease quantity"
      >
        -
      </button>
      <span
        aria-live="polite"
        className={styles.quantityValue}
        title="Current quantity"
      >
        {value}
      </span>
      <button
        className={`${styles.quantityBtn} ${styles.quantityIncrement}`}
        onClick={onIncrease}
        type="button"
        title="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
