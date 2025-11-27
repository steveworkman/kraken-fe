import { useState, useEffect } from "react";
import styles from "../styles/Product.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuantitySelector from "../components/QuantitySelector";
import { useProductStore } from "../store/useProductStore";

export default function Product() {
  const product = useProductStore((state) => state.product);
  const fetchProduct = useProductStore((state) => state.fetchProduct);
  const addToBasket = useProductStore((state) => state.addToBasket);

  const [quantity, setQuantity] = useState(1);
  const [specs, setSpecs] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    fetchProduct(1);
  }, [fetchProduct]);

  useEffect(() => {
    if (product) {
      setSpecs([
        { label: "Brand", value: product.brand },
        { label: "Item weight (g)", value: product.weight.toString() },
        {
          label: "Dimensions (cm)",
          value: `${product.height} x ${product.width} x ${product.length}`,
        },
        { label: "Item Model number", value: product.model_code },
        { label: "Colour", value: product.colour },
      ]);
    }
  }, [product]);

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
            <div className={styles.productPrice}>
              <div className={styles.price}>
                {product && formatPrice(product.price)}
              </div>
              <QuantitySelector
                className={styles.quantitySelector}
                value={quantity}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            </div>
            <div className={styles.controls}>
              <button
                type="button"
                className={styles.addToCartBtn}
                onClick={handleAddToCart}
              >
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
                  {specs.map((spec, index) => (
                    <tr key={index} className={styles.specRow}>
                      <td className={styles.specLabel}>{spec.label}</td>
                      <td className={styles.specValue}>{spec.value}</td>
                    </tr>
                  ))}
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
