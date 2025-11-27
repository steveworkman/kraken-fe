import { useState, useEffect } from "react";
import styles from "../styles/Product.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useProductStore } from "../store/useProductStore";

export default function Product() {
  const product = useProductStore((state) => state.product);
  const fetchProduct = useProductStore((state) => state.fetchProduct);
  const addToBasket = useProductStore((state) => state.addToBasket);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct(1);
  }, [fetchProduct]);

  const handleIncrease = () => {
    setQuantity((q) => q + 1);
  };

  const handleDecrease = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const handleAddToCart = () => {
    addToBasket(quantity);
  };

  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP",
    });
  };

  return (
    <div className="product-page">
      <Header />

      <main className={styles.container}>
        <div className={styles.productHeadingWrapper}>
          <div className={styles.productImage}>
            {product && <img src={product.img_url} alt={product.name} />}
          </div>
          <div className={styles.productContent}>
            <h1 className={styles.title}>{product?.name}</h1>
            <p className={styles.subtitle}>
              {product?.power} // Packet of {product?.quantity}
            </p>

            <div className={styles.price}>
              {product && formatPrice(product.price)}
            </div>

            <div className={styles.controls}>
              <div className={styles.quantitySelector}>
                <span className={styles.quantityLabel}>Qty</span>
                <button
                  className={styles.quantityBtn}
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className={styles.quantityValue} title="Current quantity">
                  {quantity}
                </span>
                <button className={styles.quantityBtn} onClick={handleIncrease}>
                  +
                </button>
              </div>
              <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div className={styles.productDetails}>
          <div className={styles.description}>
            <h2 className={styles.descriptionTitle}>Description</h2>
            <p>{product?.description}</p>
          </div>

          {product && (
            <div className={styles.specs}>
              <h2 className={styles.specsTitle}>Specifications</h2>
              <table className={styles.specTable}>
                <tbody>
                  <tr className={styles.specRow}>
                    <td className={styles.specLabel}>Brand</td>
                    <td className={styles.specValue}>{product.brand}</td>
                  </tr>
                  <tr className={styles.specRow}>
                    <td className={styles.specLabel}>Item weight</td>
                    <td className={styles.specValue}>{product.weight}g</td>
                  </tr>
                  <tr className={styles.specRow}>
                    <td className={styles.specLabel}>Dimensions</td>
                    <td className={styles.specValue}>
                      {product.height}x{product.width}x{product.length} cm
                    </td>
                  </tr>
                  <tr className={styles.specRow}>
                    <td className={styles.specLabel}>Item Model number</td>
                    <td className={styles.specValue}>{product.model_code}</td>
                  </tr>
                  <tr className={styles.specRow}>
                    <td className={styles.specLabel}>Colour</td>
                    <td className={styles.specValue}>{product.colour}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
