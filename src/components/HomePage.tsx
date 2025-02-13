import React from "react";
import AllDogs from "./AllDogs.tsx";
import { Box } from "@mui/material";


const HomePage: React.FC = () => {
	
	return (
		<>
			<Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
				<AllDogs />
			</Box>
		</>
	);
}
export default HomePage;