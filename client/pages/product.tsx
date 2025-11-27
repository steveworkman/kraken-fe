import { useState, useEffect } from "react";
import styles from "../styles/Product.module.css";

interface ProductData {
  id: string;
  name: string;
  power: string;
  description: string;
  price: number;
  quantity: number;
  brand: string;
  weight: number;
  height: number;
  width: number;
  length: number;
  model_code: string;
  colour: string;
  img_url: string;
}

export default function Product() {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [basketCount, setBasketCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      if (typeof fetch === "undefined") return;
      try {
        const res = await fetch("http://localhost:3001/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query {
                Product(id: 1) {
                  id
                  name
                  power
                  description
                  price
                  quantity
                  brand
                  weight
                  height
                  width
                  length
                  model_code
                  colour
                  img_url
                }
              }
            `,
          }),
        });
        const json = await res.json();
        if (json.data && json.data.Product) {
          setProduct(json.data.Product);
        }
      } catch (e) {
        console.error("Failed to fetch product", e);
      }
    }
    fetchData();
  }, []);

  const handleIncrease = () => {
    setQuantity((q) => q + 1);
  };

  const handleDecrease = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const handleAddToCart = () => {
    setBasketCount((c) => c + quantity);
  };

  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP",
    });
  };

  return (
    <div className="product-page">
      <nav className="header">
        <div className="header__container">
          <img
            src="/octopus-logo.svg"
            alt="Octopus Energy"
            className="header__logo"
          />
          <div className="header__basket">
            <img
              src="/basket.svg"
              alt="Basket"
              className="header__basket-icon"
            />
            <span className="header__basket-count" title="Basket items">
              {basketCount}
            </span>
          </div>
        </div>
      </nav>

      <main className={styles.container}>
        <div className={styles.productWrapper}>
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
        </div>
      </main>

      <footer className="footer">
        <div className="footer__container">
          Octopus Energy Ltd is a company registered in England and Wales.
          Registered number: 09263424. Registered office: 33 Holborn, London,
          EC1N 2HT. Trading as Octopus Energy.
        </div>
      </footer>
    </div>
  );
}
