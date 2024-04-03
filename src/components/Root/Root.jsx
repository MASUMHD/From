import { Outlet } from "react-router-dom";
import Nav from "../Hader/Nav"

const Root = () => {
    return (
        <div className="container mx-auto pl-20 pr-20  ">
            <Nav/>
            <Outlet/>
        </div>
    );
};

export default Root;