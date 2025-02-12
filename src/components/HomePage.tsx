import React, { useCallback, useRef, useState } from "react";
import SearchComponent from "./SearchComponent.tsx";
import AllDogs from "./AllDogs.tsx";
import { ColDef, createGrid, GridApi, GridOptions } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Box, Link } from "@mui/material";


const HomePage: React.FC = () => {
	


	return (
		<>
			<Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh', border: '1px solid black' }}>
				<AllDogs />
			</Box>
		</>
	);
}
export default HomePage;