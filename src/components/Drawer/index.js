import { useRef, useState } from "react";
import axios from "axios";
import { BsX } from "react-icons/bs";


import Info from "../Info";
import { useCart } from "../../hooks/useCart";
import { fullDate } from "../orderDate";

import styles from "./Drawer.module.scss";

const delay = (ms) =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });

export default function Driwer({ onClose, addToDb, items = [], opened }) {
    const { cartItems, setCartItems, totalPrice } = useCart();
    const [orderId, setOrderId] = useState(null);
    const [isOrdersComplete, setIsOrdersComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post(
                "https://64c79fc4a1fe0128fbd50a97.mockapi.io/orders",
                {
                    items: cartItems,
                    fullDate
                }
            );
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(
                    `https://64c4cf1967cfdca3b660ffea.mockapi.io/cart/${item.api_id}`
                );
                await delay(1000);
            }
            setOrderId(data.id);
            setIsOrdersComplete(true);
            setCartItems([]);
        } catch (error) {
            alert("Purchase error!");
            console.error(error);
        }
        setIsLoading(false);
    };
    const overlay = useRef(null);

    return (
        <div
            className={`${styles.overlay} ${opened ? styles.active : ""}`}
            ref={overlay}
            onClick={(event) => event.target === overlay.current && onClose()}
        >
            <div className={styles.drawer}>
                <h2>
                    My cart
                    <div className={styles.btn_close}>
                        <BsX className={styles.icon}
                            onClick={onClose}
                        />
                    </div>
                </h2>

                {items.length > 0 ? (
                    <>
                        <div className={styles.cart__items}>
                            {items.map((item, index) => {
                                return (
                                    <div
                                        className={styles.cart__item}
                                        key={index}
                                    >
                                        <div
                                            style={{
                                                backgroundImage: `url(img/phones/${item.id}.webp)`,
                                            }}
                                            className={styles.cart__item__img}
                                        ></div>

                                        <div>
                                            <p>{item.title}</p>
                                            <b>{item.price} $</b>
                                        </div>

                                        <div className={styles.btn_close}>
                                            <BsX className={styles.icon}
                                                onClick={() =>
                                                    addToDb(item, "cart")
                                                }
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className={styles.cart__total}>
                            <ul>
                                <li>
                                    <span>Total price:</span>

                                    <div></div>

                                    <b>{totalPrice} $</b>
                                </li>
                            </ul>

                            <button
                                disabled={isLoading}
                                className={styles.btn_green}
                                onClick={onClickOrder}
                            >
                                Checkout <img src="img/arrow.svg" alt="Arrow" />
                            </button>
                        </div>
                    </>
                ) : (
                    <Info
                        title={
                            isOrdersComplete
                                ? "Order is processed"
                                : "Cart is empty"
                        }
                        description={
                            isOrdersComplete
                                ? `Your order #${orderId} will be delivered to courier soon`
                                : "Add at least one pair of sneakers to place an order."
                        }
                        image={
                            isOrdersComplete
                                ? "img/complete_order.png"
                                : "img/cart_empty.png"
                        }
                    />
                )}
            </div>
        </div>
    );
}
