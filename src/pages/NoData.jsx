import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NoData({ db }) {
    const [randomEmoji, setRandomEmoji] = useState(0);

    useEffect(() => {
        setRandomEmoji(() => Math.floor(Math.random() * 4));
    }, [db]);

    const title =
        db === "favorite" ? "No favorites phones :(" : "You have no orders";
    const subTitle =
        db === "favorite"
            ? "Go back to the home page and click on the heart icon"
            : "Oops....";

    return (
        <div className="content">
            <div className="noData">
                <img
                    src={`img/emoji/emoji_${randomEmoji}.png`}
                    alt="Emoji"
                    width={70}
                    height={70}
                />
                <h1>{title}</h1>
                <p>{subTitle}</p>
                <Link to="/">
                    <button className="btn_green">
                        <img src="img/arrow.svg" alt="Arrow" />
                        Back to the home page
                    </button>
                </Link>
            </div>
        </div>
    );
}
