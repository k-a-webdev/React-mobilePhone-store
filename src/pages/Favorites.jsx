import { useContext } from "react";

import AppContext from "../context";

import Card from "../components/Card";
import NoData from "./NoData";

export default function Favorite({ reloadFavorite }) {
    const { favoriteItems } = useContext(AppContext);

    return (
        <div className="content">
            <div className="content__header">
                <h1>My favorites</h1>
            </div>

            <div className="cards">
                {favoriteItems.map((card) => (
                    <Card key={card.api_id} {...card} favorited={true} />
                ))}
            </div>

            {favoriteItems.length > 0 ? null : <NoData />}
        </div>
    );
}
