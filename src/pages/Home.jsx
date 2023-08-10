import Card from "../components/Card";

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
            <Card
                {...card}
                // key={card.id}
                key={card.id}
                loading={isLoading}
            />
        ));
    };

    return (
        <div className="content">
            <div className="content__header">
                <h1>
                    {searchValue
                        ? `Search: "${searchValue}"`
                        : "All mobile phones"}
                </h1>

                <div className="seaerch_block">
                    <img src="img/search.svg" alt="Search" />

                    <input
                        placeholder="Search...."
                        onChange={onChangeSearchInput}
                        value={searchValue}
                    />
                    {searchValue && (
                        <img
                            className="remove__btn"
                            src="img/btn_remove.svg"
                            alt="Clear"
                            onClick={() => setSearchValue("")}
                        />
                    )}
                </div>
            </div>

            <div className="cards">{renderItems()}</div>
        </div>
    );
}
