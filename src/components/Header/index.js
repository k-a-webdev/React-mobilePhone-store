// import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

import styles from './Header.module.scss';

export default function Header(props) {
    const { totalPrice } = useCart();

    return (
        <header>
            <Link to="/">
                <div className={styles.headerLeft}>
                    <img width="40" height="40" src="img/logo.png" alt="Logo" />

                    <div className="headerInfo">
                        <h3>Mobile phone store</h3>
                        <p>Shop of the best mobile phones</p>
                    </div>
                </div>
            </Link>

            <ul className={styles.headerRight}>
                <li onClick={props.onClickCart}>
                    <img width="18" height="18" src="img/cart.svg" alt="Cart" />
                    <span>{totalPrice} $</span>
                </li>

                <li>
                    <Link to="React-mobilePhone-store/favorites">
                        <img
                            width="18"
                            height="18"
                            src="img/heart.svg"
                            alt="Favorites"
                        />
                    </Link>
                </li>

                <li>
                    <Link to="React-mobilePhone-store/orders">
                        <img
                            width="18"
                            height="18"
                            src="img/user.svg"
                            alt="Profile"
                        />
                    </Link>
                </li>
            </ul>
        </header>
    );
}
