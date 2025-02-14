import React from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";



const SignOut: React.FC = () => {
    const navigate = useNavigate();

	const handleOnClick = () => {
		navigate('/');
	}

	return (
		<Box>
			<Button 
				sx={{ml: 3, fontWeight: '900'}}
				onClick={handleOnClick}
			>
				Sign out
			</Button>
		</Box>
	)
}

export default SignOut;