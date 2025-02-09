import React from "react";
import SearchComponent from "./Search.tsx";


const HomePage: React.FC = () => {
    return (
    	<SearchComponent onSearch={(query) => console.log(query)} />
    );
}
export default HomePage;