import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsCart2, BsBookmarkHeart, BsBagCheck } from "react-icons/bs";

import { useCart } from "../../hooks/useCart";

import styles from "./Header.module.scss";

export default function Header(props) {
    const { totalPrice } = useCart();
    const [headerSubtitle, setHeaderSubtitle] = useState("");
    let location = useLocation();

    useEffect(() => {
        if (location.pathname === "/")
            setHeaderSubtitle("Shop of the best mobile phones");
        else setHeaderSubtitle("Click to return to the homepage");
    }, [location]);

    return (
        <header>
            <Link to="/">
                <div className={styles.headerLeft}>
                    <img width="40" height="40" src="img/logo.png" alt="Logo" />

                    <div className="headerInfo">
                        <h3>Mobile phone store</h3>
                        <p>{headerSubtitle}</p>
                    </div>
                </div>
            </Link>

            <ul className={styles.headerRight}>
                <li onClick={props.onClickCart} title="Cart">
                    <BsCart2 className={styles.cartIcon} />
                    <span>{totalPrice} $</span>
                </li>

                <li>
                    <Link
                        to="/favorites"
                        title="Favorites"
                    >
                        <BsBookmarkHeart className={styles.favoriteIcon} />
                    </Link>
                </li>

                <li>
                    <Link to="/orders" title="Orders">
                        <BsBagCheck className={styles.orderIcon} />
                    </Link>
                </li>
            </ul>
        </header>
    );
}
