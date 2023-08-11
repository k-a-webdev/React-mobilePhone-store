import { Link } from "react-router-dom";

export default function PageNotFound({ db }) {
    return (
        <div className="content">
            <div className="noData pnf">
                <h1>Whoops....</h1>
                <h2>404 Page Not Found</h2>
                <img
                    className="pnf__img"
                    src="img/pageNotFound.jpg"
                    alt="Page not found"
                />
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
