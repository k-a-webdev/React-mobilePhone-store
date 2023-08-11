import { useContext, useEffect, useState } from "react";

import AppContext from "../context";

import Card from "../components/Card";
import NoData from "./NoData";

export default function Favorite() {
    const [isLoading, setIsLoading] = useState(true);
    const { favoriteItems } = useContext(AppContext);

    const fakeCards = new Array(4)
        .fill({})
        .map((elem, index) => ({ id: index }));
    
    useEffect(() => {
        setIsLoading(false);
    }, [])

    return (
        <div className="content">
            <div className="content__header">
                {(isLoading || favoriteItems.length > 0) && <h1>My favorites</h1>}
            </div>

            <div className="cards">
                {(isLoading ? fakeCards : favoriteItems).map((card) => (
                    <Card key={card.id} {...card} loading={isLoading} />
                ))}
            </div>

            {!isLoading && favoriteItems.length === 0 && <NoData db="favorite" />}
        </div>
    );
}
