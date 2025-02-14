import React from "react";
import AllDogs from "./AllDogs";
import { Box } from "@mui/material";
import SignOut from "./SignOut";


const HomePage: React.FC = () => {
	
	return (
		<>
			<SignOut />
			<Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
				<AllDogs />
			</Box>
		</>
	);
}
export default HomePage;