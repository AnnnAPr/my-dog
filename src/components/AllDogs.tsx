import React, { useEffect, useState } from "react";
import { Avatar, Box, Container, FormControlLabel, Paper, TextField, Typography, Checkbox, Button, Card, CardContent, CardMedia, List, ListItem, ListItemText, Pagination, Link, ToggleButtonGroup } from '@mui/material';

const AllDogs: React.FC = () => {
		const totalDogs = 10000;

    const baseUrl = ' https://frontend-take-home-service.fetch.com';

		const [dogs, setDogs] = useState<any[]>([]);
		console.log('Dogs out of sorting:', dogs);

		const dogsPerPage = 25;
		
		const [page, setPage] = useState(1);

		const [isAscending, setIsAscending] = useState(true);
		console.log('Is Ascending outside:', isAscending);

		const sorDogsByBreed = () => {
			console.log('inside sort dogs before sort:', dogs);
			if (!isAscending) {
				let sortedDogs = dogs.sort((a, b) => a.breed.localeCompare(b.breed));
				console.log('I am inside if sortedDogs:', sortedDogs);
				setDogs(sortedDogs);
			} else {
				let sortedDogs = dogs.sort((a, b) => b.breed.localeCompare(a.breed));
				console.log('I am inside else sortedDogs:', sortedDogs);
				setDogs(sortedDogs);
			}
			setIsAscending(!isAscending);
		};

		const fetchData = async (page) => {


			try {
				const idsResponse = await fetch(`${baseUrl}/dogs/search?size=25&from=${(page - 1) * 25}`, {
					method: 'GET',
					credentials: "include",
					headers: {
						'Content-Type': 'application/json'
					},
				});

				const data = await idsResponse.json();
				const ids = data.resultIds
				console.log('Ids:', ids);
				

				const currentDogs = await fetch(`${baseUrl}/dogs`, {
					method: 'POST',
					credentials: "include",
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(ids)
				})
				const currentDogsData = await currentDogs.json();
				const sortedDogs = currentDogsData.sort((a, b) => a.breed - b.breed);
				console.log('Current Dogs:', currentDogsData);
				console.log('Sorted Dogs:', sortedDogs);
				setDogs(sortedDogs);
			} catch (error) {	
				console.error('Error fetching data:', error);
			}
		};

		const handleChangePage = (event, newPage) => {
			setPage(newPage);
			fetchData(newPage);
			setIsAscending(true);
		};

		useEffect(() => {
        fetchData(page);
    }, []);

    return (
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', border: '1px solid red', width: '800px' }}>
						<h1>Our ❤️ dogs</h1>
						<Box sx={{ mb: 2 }}>
							{`Total Dogs: ${totalDogs}. Displayed: ${dogsPerPage}.`}
						</Box>
						<Link href="/search" underline="always" target="_blank" sx={{mb: 2}}>Search for the dogs</Link>
						<Box sx={{mb: 2}}>
							<div>Current order: {isAscending ? "ASCENDING" : "DESCENDING"}</div>
						</Box>
						<Box display="flex" justifyContent="center" alignItems="center" sx={{mb: 2}}>
							<div>Sort by the breed:</div>
							<Button 
								variant="contained" 
								color="primary"
								sx={{mx: 2}} 
								// disabled={isAscending}
								onClick={sorDogsByBreed}
							>
								{`${!isAscending ? 'Ascending' : 'Descending'}`}
							</Button>
						</Box>
            <Box>
							{dogs.map((dog) => (
								<Card sx={{ maxWidth: 500, mb: 2, width: '600px' }}>
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
						<Box sx={{border: '1px solid green', width: '100%', display: 'flex', justifyContent: 'center'}}>
							<Pagination
								count={totalDogs/25}
								page={page}
								onChange={handleChangePage}
								variant="text"
								shape="rounded"
								sx={{height: '50px'}}
								color="primary"
							/>
						</Box>
        </Box>
    )
}

export default AllDogs;