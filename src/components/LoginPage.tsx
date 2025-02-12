import { Avatar, Box, Container, FormControlLabel, Paper, TextField, Typography, Checkbox, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage.tsx';
import { useNavigate } from 'react-router-dom';

// interface FormData {
//   name: string;
//   email: string;
// }

const LoginPage: React.FC = () => {

	const baseUrl = ' https://frontend-take-home-service.fetch.com'
	const navigate = useNavigate();

	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	}

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	}

	const handleOnSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
				credentials: "include",
				body: JSON.stringify({
					name: name,
					email: email
				}),
				headers: {
					'Content-Type': 'application/json'
				}
      });

			console.log("response: ", response)

			navigate('/home');
    } catch (err: any) {
			console.log("error: ", err)
      // setError(err.message);
    }
  };

	return (
		<Container maxWidth="xs" 
		>
			<Paper elevation={10} sx={{ padding: 2, marginTop: 8 }}>
				<Avatar sx={{ 
					mx: 'auto', 
					bgcolor: 'success.main', 
					textAlign: 'center',
					mb: 1,
				}}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant="h5" component={'h1'} sx={{ textAlign: 'center' }}>
					Sign In
				</Typography>
				<Box 
					component='form' 
					onSubmit={handleOnSubmit} 
					noValidate
					sx={{mt: 1}}
				>
					<TextField 
						placeholder="Enter name" 
						label="Name" 
						required 
						fullWidth 
						autoFocus 
						sx={{mb: 2}}
						onChange={handleNameChange}
					/>
					<TextField 
						placeholder="Enter email" 
						label="Email" 
						required 
						fullWidth 
						sx={{mb: 2}}
						onChange={handleEmailChange}
					/>
				
					<Button 
						type='submit' 
						color='primary' 
						variant='contained' 
						fullWidth sx={{mt: 1}}
					>
						Sign In
					</Button>
				</Box>
			</Paper>
		</Container>
  )
}

export default LoginPage;