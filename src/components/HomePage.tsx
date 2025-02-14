import React from "react";
import AllDogs from "./AllDogs.tsx";
import { Box, Button } from "@mui/material";
import SignOut from "./SignOut.tsx";


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