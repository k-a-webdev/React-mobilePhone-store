import { BsX } from "react-icons/bs";

import Card from "../components/Card";
import Slider from "../components/Slider";

export default function Home({
    cards,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    isLoading,
}) {
    const renderItems = () => {
        const filteredCards = cards.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        );

        const fakeCards = new Array(4)
            .fill({})
            .map((elem, index) => ({ id: index }));

        return (isLoading ? fakeCards : filteredCards).map((card, index) => (
            <Card {...card} key={card.id} loading={isLoading} />
        ));
    };

    return (
        <div className="content">
            <Slider />

            <div className="content__header">
                <h1>
                    {searchValue
                        ? `Search: "${searchValue}"`
                        : "All mobile phones"}
                </h1>

                <div className="seaerch_block" title="Search">
                    <img src="img/search.svg" alt="Search" />

                    <input
                        placeholder="Search...."
                        onChange={onChangeSearchInput}
                        value={searchValue}
                    />
                    {searchValue && (
                        <div className="close_btn">
                            <BsX
                                className="icon"
                                onClick={() => setSearchValue("")}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="cards">{renderItems()}</div>
        </div>
    );
}
