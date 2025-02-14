import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Card, CardContent, CardMedia, Grid, List, ListItem, ListItemText, Pagination, Typography } from '@mui/material';
import { Dog } from './common.ts';
import SignOut from './SignOut.tsx';


interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchComponent: React.FC<SearchProps> = ({ placeholder = 'Search by dog id' }) => {

	// State variables
  const [searchText, setSearchText] = useState('');
  const [dogs, setDogs] = useState<Dog[]>([]);

	const fetchData = async (searchText = '') => {
		let dataArray = searchText === '' ? [] : searchText.replaceAll(/['"`\s]/g, '').split(',');
		try {
			const response = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
				method: 'POST',
				credentials: "include",
				headers: {
						'Content-Type': 'application/json'
				},
				body: JSON.stringify(dataArray)
			});
			const data = await response.json();
			setDogs(data);
		} catch (error) {
				console.error('Error fetching data:', error);
		}
	};

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

	const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
	  	handleSearch(event);
    }
  };

	const handleSearch = async (event) => {
		event.preventDefault();
    fetchData(searchText);
  };

	useEffect(() => {
    fetchData();
  }, []);

  return (
		<Box sx={{mt: 2, height: '50px'}}>
			<SignOut />
			<Box sx={{display: 'flex', justifyContent: 'center'}}>
				<TextField
					label={placeholder}
					variant="outlined"
					size="small"
					value={searchText}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					slotProps={{
						input: {
							endAdornment: (
								<IconButton onClick={handleSearch} aria-label="search">
										<SearchIcon />
								</IconButton>
							),
						}
					}}
					sx={{ width: '40%' }}
				/>
				<Button variant="contained" color="primary" onClick={handleSearch} sx={{ml: 2}}>
					Search
				</Button>
			</Box>
			<Box sx={{display: 'flex', flexDirection: 'column', ml: '37%'}}>
				{dogs.map((dog) => (
					// <DogCard dog={dog} />
					<Card sx={{ maxWidth: 500, mt: 4,  width: '600px' }} key={dog.id}>
						<CardMedia 
								sx={{ height: 400 }}
								image={`${dog.img}`}
								title={`${dog.name}`}
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div" sx={{mb: 0}}>
									{dog.name}
							</Typography>
							<Typography variant="body2" sx={{ color: 'text.secondary' }}>
								<List>
									<ListItem>
											<ListItemText primary={`Age: ${dog.age}`} />
									</ListItem>
									<ListItem>
											<ListItemText primary={`Breed: ${dog.breed}`} />
									</ListItem>
									<ListItem>
											<ListItemText primary={`Zip Code: ${dog.zip_code}`} />
									</ListItem>
								</List>
							</Typography>
						</CardContent>
					</Card>
				))}
			</Box>
		
		</Box>
  );
};

export default SearchComponent;