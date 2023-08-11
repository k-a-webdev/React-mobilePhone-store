import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

// Global settings
import AppContext from "./context";
import { urls } from "./config";

// Components
import Header from "./components/Header";
import Drawer from "./components/Drawer";

// Pages
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
    const { itemsUrl, cartUrl, favoriteUrl } = urls;
    const [cards, setCards] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [isCartOpened, setIsCartOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Request for all data except the list of orders
    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);

                const [cartResponse, favoritesResponse, itemsResponse] =
                    await Promise.all([
                        axios.get(cartUrl),
                        axios.get(favoriteUrl),
                        axios.get(itemsUrl),
                    ]);

                setIsLoading(false);

                setCartItems(cartResponse.data);
                setFavoriteItems(favoritesResponse.data);
                setCards(itemsResponse.data);
            } catch (error) {
                alert("Failed data request");
                console.error(error);
            }
        }

        fetchData();
    }, []);

    // Hide scroll when cart is open
    useEffect(() => {
        if (isCartOpened) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
    }, [isCartOpened]);

    // Func adding to cart/favorites
    const addToDb = async (item, db) => {
        const currentDb = {
            items: eval(`${db}Items`),
            setFunc: eval(
                `set${db.charAt(0).toUpperCase() + db.slice(1)}Items`
            ),
            dbUrl: eval(`${db}Url`),
        };

        try {
            if (currentDb.items.some((elem) => elem.id === item.id)) {
                // If user click on add button so fast and requests do not have time to be processed
                if (currentDb.items.some((elem) => elem.api_id === undefined)) {
                    alert(
                        "Please don't be so fast. Request not yet completed!"
                    );
                } else {
                    await removeFromDb(
                        currentDb.items.find((el) => el.id === item.id).api_id,
                        item.id,
                        currentDb.setFunc,
                        currentDb.dbUrl
                    );
                }
            } else {
                currentDb.setFunc((prev) => [...prev, item]);

                const { data } = await axios.post(currentDb.dbUrl, item);

                currentDb.setFunc((prev) =>
                    prev.map((el) => {
                        if (el.id === data.id)
                            return {
                                ...el,
                                api_id: data.api_id,
                            };
                        else return el;
                    })
                );
            }
        } catch (error) {
            alert("Error adding to cart");
            console.error(error);
        }
    };

    const removeFromDb = async (id, cardId, setFunc, url) => {
        try {
            setFunc((prev) => prev.filter((item) => item.id !== cardId));
            await axios.delete(`${url}/${id}`);
        } catch (error) {
            alert("Error deleting from cart");
            console.error(error);
        }
    };

    const onChangeSearchInput = (event) => setSearchValue(event.target.value);

    // To check whether the item is in the cart/favorites
    const isItemInDb = (id, db) => {
        const currentDb = {
            items: eval(`${db}Items`),
        };
        return currentDb.items.some((card) => card.id === id);
    };

    return (
        <AppContext.Provider
            value={{
                cartItems,
                favoriteItems,
                isItemInDb,
                addToDb,
                setIsCartOpened,
                setCartItems,
            }}
        >
            <div className="wrapper">
                <Drawer
                    onClose={() => setIsCartOpened(false)}
                    addToDb={addToDb}
                    items={cartItems}
                    opened={isCartOpened}
                />

                <Header onClickCart={() => setIsCartOpened(true)} />

                <Routes>
                    <Route path="/">
                        <Route
                            path=""
                            element={
                                <Home
                                    cards={cards}
                                    searchValue={searchValue}
                                    setSearchValue={setSearchValue}
                                    onChangeSearchInput={onChangeSearchInput}
                                    isLoading={isLoading}
                                />
                            }
                        />
                        <Route path="favorites" element={<Favorites />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                    {/* TODO: Розширити orders сторінками, щоб по 5-10 ордерів на одній сторінці й так до 20-30. Також додати навігацію по сторінкам */}
                </Routes>
            </div>
        </AppContext.Provider>
    );
}
