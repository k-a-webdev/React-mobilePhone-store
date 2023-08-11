import { useContext } from "react";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";
import AppContext from "../../context";
import { BsPlus, BsCheck } from "react-icons/bs";

export default function Card({ api_id, id, title, price, loading = false }) {
    const { isItemInDb, addToDb } = useContext(AppContext);

    const added = isItemInDb(id, "cart");
    const favorited = isItemInDb(id, "favorite");

    const cardInfo = { id, title, price, api_id };

    return (
        <div className={styles.card}>
            {loading ? (
                <ContentLoader
                    speed={2}
                    width={"165"}
                    height={"220"}
                    viewBox="0 0 210 260"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
                    <rect x="0" y="106" rx="3" ry="3" width="150" height="15" />
                    <rect x="0" y="125" rx="3" ry="3" width="100" height="15" />
                    <rect x="0" y="162" rx="8" ry="8" width="80" height="25" />
                    <rect
                        x="118"
                        y="154"
                        rx="8"
                        ry="8"
                        width="32"
                        height="32"
                    />
                </ContentLoader>
            ) : (
                <>
                    <div
                        className={styles.favorite}
                        onClick={() => addToDb(cardInfo, "favorite")}
                        title={
                            favorited
                                ? "Delete from favorite"
                                : "Add to favorite"
                        }
                    >
                        <img
                            src={
                                favorited ? "img/liked.svg" : "img/unliked.svg"
                            }
                            alt="Like"
                        />
                    </div>

                    <div className={styles.cardImg}>
                        <img
                            height={185}
                            src={`img/phones/${id}.webp`}
                            alt="Phone"
                        />
                    </div>
                    <h5>{title}</h5>
                    <div className={styles.bottom}>
                        <div>
                            <p>Price:</p>
                            <b>{price} $</b>
                        </div>

                        <div
                            className={`${styles.addToCart} ${
                                added ? styles.active : ""
                            }`}
                            onClick={() => addToDb(cardInfo, "cart")}
                            title={added ? "Delete from cart" : "Add to cart"}
                        >
                            {added ? (
                                <BsCheck className={styles.icon} />
                            ) : (
                                <BsPlus className={styles.icon} />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
