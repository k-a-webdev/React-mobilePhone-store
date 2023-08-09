import { useContext, useEffect, useState } from "react";

import AppContext from "../context";

import Card from "../components/Card";
import axios from "axios";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(
                    "https://64c79fc4a1fe0128fbd50a97.mockapi.io/orders"
                );
                setOrders(data);
                setIsLoading(false);
            } catch (error) {
                alert("Error when requesting orders!");
                console.error(error);
            }
        })();
    }, []);

    const fakeCards = [
        {
            id: 0,
        },
        {
            id: 1,
        },
        {
            id: 2,
        },
        {
            id: 3,
        },
    ];
    const fakeOrders = [
        {
            id: 0,
            items: fakeCards,
        },
        {
            id: 1,
            items: fakeCards,
        },
    ];

    return (
        <div className="content">
            <div className="content__header">
                <h1>My orders</h1>
            </div>

            <div className="orders">
                {(isLoading ? fakeOrders : orders).map((item) => {
                    return (
                        <div className="order" key={item.id}>
                            <h2 className="order__id">Order #{item.id}</h2>
                            {/* TODO: Додати дату замовлення */}
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
        </div>
    );
}
