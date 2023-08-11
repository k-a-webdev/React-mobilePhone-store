import { useEffect, useState } from "react";

import Card from "../components/Card";
import axios from "axios";
import NoData from "./NoData";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [countOrders, setCountOrders] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const url = new URL(
                    "https://64c79fc4a1fe0128fbd50a97.mockapi.io/orders"
                );
                const { data } = await axios.get(url);
                setCountOrders(data.length);
                setOrders(data.filter((item) => item.id > data.length - 5));
                setIsLoading(false);
            } catch (error) {
                alert("Error when requesting orders!");
                console.error(error);
            }
        })();
    }, []);

    const fakeCards = new Array(4)
        .fill({})
        .map((elem, index) => ({ id: index }));
    const fakeOrders = new Array(2)
        .fill({})
        .map((elem, index) => ({ id: index, items: fakeCards }));

    return (
        <div className="content">
            {orders.length > 0 ? (
                <>
                    <div className="content__header">
                        <h1>All orders - {countOrders}. Last 5 orders:</h1>
                    </div>

                    <div className="orders">
                        {(isLoading ? fakeOrders : orders).map((item) => {
                            return (
                                <div className="order" key={item.id}>
                                    <div className="order__info">
                                        <h2>Order #{item.id}</h2>
                                        <p>
                                            Date:{" "}
                                            {orders.length > 0
                                                ? `${item.fullDate.date} (${item.fullDate.time})`
                                                : null}
                                        </p>
                                    </div>
                                    <div className="cards">
                                        {item.items.map((card) => (
                                            <Card
                                                key={card.id}
                                                {...card}
                                                favorited={true}
                                                loading={isLoading}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : (
                <NoData db="order" />
            )}
        </div>
    );
}
