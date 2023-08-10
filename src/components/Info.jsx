import { useContext } from "react";
import AppContext from "../context";

import styles from "./Drawer/Drawer.module.scss";

export default function Info({ title, image, description }) {
    const { setIsCartOpened } = useContext(AppContext);
    return (
        <div className={styles.cart__empty}>
            <img width="120px" src={image} alt={title} />
            <h2>{title}</h2>
            <p>{description}</p>
            <button
                className={styles.btn_green}
                onClick={() => setIsCartOpened(false)}
            >
                <img src="img/arrow.svg" alt="Arrow" />
                Come back
            </button>
        </div>
    );
}
