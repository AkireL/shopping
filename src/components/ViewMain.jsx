import { Link } from "react-router-dom";


function ViewMain() {
    return(
        <>
            <header>
            <h1>Shopping List</h1>
            <p>
                <Link to="/create">New</Link>
            </p>
        </header>
        </>
    );
}
export default ViewMain;