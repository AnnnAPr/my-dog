import { Avatar, Box, Container, Paper, TextField, Typography, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl} from './common.ts';

const LoginPage: React.FC = () => {

	// const baseUrl = ' https://frontend-take-home-service.fetch.com'
	const navigate = useNavigate();
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [isNameEntered, setIsNameEntered] = useState(false);
	const [isEmailEntered, setIsEmailEntered] = useState(false);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
		setIsNameEntered(!isNameEntered);
	}

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		setIsEmailEntered(!isEmailEntered);
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

			navigate('/home');
    } catch (err: any) {
			console.log("error: ", err)
    }
  };

	return (
		<Container maxWidth="xs" >
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
						placeholder="required" 
						label="Name" 
						required 
						fullWidth 
						autoFocus 
						sx={{mb: 2}}
						onChange={handleNameChange}
					/>
					<TextField 
						placeholder="required" 
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
						disabled={!isNameEntered || !isEmailEntered}
					>
						Sign In
					</Button>
				</Box>
			</Paper>
		</Container>
  )
}

export default LoginPage;