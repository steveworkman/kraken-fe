import { useProductStore } from "../store/useProductStore";

export default function Header() {
  const basketCount = useProductStore((state) => state.basketCount);

  return (
    <nav className="header">
      <div className="header__container">
        <img
          src="/octopus-logo.svg"
          alt="Octopus Energy"
          className="header__logo"
        />
        <div className="header__basket">
          <img src="/basket.svg" alt="Basket" className="header__basket-icon" />
          <span className="header__basket-count" title="Basket items">
            {basketCount}
          </span>
        </div>
      </div>
    </nav>
  );
}
