import React, { useEffect, useState } from "react";
import { 
	Box, 
	Typography,
	Button, 
	Card, 
	CardContent, 
	CardMedia, 
	List, 
	ListItem, 
	ListItemText, 
	Pagination, 
	Link, 
	FormControl, 
	InputLabel, 
	MenuItem, 
	Select, 
	SelectChangeEvent, 
	Tooltip 
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { baseUrl, fetchDogIds } from "./common";
// import DogCard from "./DogCard.tsx";

const AllDogs: React.FC = () => {

		const totalDogs = 10000;
		const dogsPerPage = 25;

    // State variables
		const [dogs, setDogs] = useState<any[]>([]);
		const [filterBreed, setFilterBreed] = useState('');
		const [listOfBreeds, setListOfBreeds] = useState<string[]>([]);
		const [page, setPage] = useState(1);
		const [isAscending, setIsAscending] = useState(true);
		
		const getBreeds = () => {
			const breeds = dogs.map((dog) => dog.breed);
			const uniqueBreeds = [...new Set(breeds)];
			setListOfBreeds(uniqueBreeds);
		}

		const sorDogsByBreed = () => {
			if (!isAscending) {
				let sortedDogs = dogs.sort((a, b) => a.breed.localeCompare(b.breed));
				setDogs(sortedDogs);
			} else {
				let sortedDogs = dogs.sort((a, b) => b.breed.localeCompare(a.breed));
				setDogs(sortedDogs);
			}
			setIsAscending(!isAscending);
		};

		const fetchData = async (page: number) => {
			try {
				const ids = await fetchDogIds(page);
				
				const currentDogs = await fetch(`${baseUrl}/dogs`, {
					method: 'POST',
					credentials: "include",
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(ids)
				})
				const currentDogsData = await currentDogs.json();
				const sortedDogs = currentDogsData.sort((a: { breed: string }, b: { breed: string }) => a.breed.localeCompare(b.breed));
				setDogs(sortedDogs);
			} catch (error) {	
				console.error('Error fetching data:', error);
			}
		};

		const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
			setPage(newPage);
			fetchData(newPage);
			setIsAscending(true);
			setFilterBreed('');
		};

		const handleChangeBreed = (event: SelectChangeEvent) => {
			setFilterBreed(event.target.value);
			const filteredDogs = dogs.filter((dog) => dog.breed === event.target.value);
			setDogs(filteredDogs);
		};

		const resetFilter = () => {
			setFilterBreed('');
			fetchData(page);
		}

		const scrollToBottom = () => {
			window.scrollTo({
				top: document.documentElement.scrollHeight,
				behavior: 'auto'
			});
		};

		const scrollToTop = () => {
			window.scrollTo({
				top: 0,
				behavior: 'auto'
			});
		};

		useEffect(() => {
      fetchData(page);
    }, [page]);

		useEffect(() => {
			getBreeds();
		}, [dogs]);


    return (
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', width: '1200px' }}>
					<h1>Our ❤️ dogs</h1>
					<Button onClick={scrollToBottom} sx={{mr: 10, fontSize: '15px', fontStyle: 'italic', fontWeight: 'bold'}} value='italic'>Go to Bottom</Button>
					<Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} sx={{mb: 2}}>
						<Box component='section'>
							<Box sx={{ mb: 2 }}>
								{`Total Dogs: ${totalDogs}. Displayed: ${dogsPerPage}.`}
							</Box>
							<Link href="/search" underline="always" target="_blank" sx={{mb: 2}}>Search for the dogs</Link>
							<Box sx={{mb: 2, mt: 2}}>
								<div>Current order: {isAscending ? "ASCENDING" : "DESCENDING"}</div>
							</Box>
							<Box display="flex" justifyContent="center" alignItems="center" sx={{mb: 2}}>
								<div>Sort by the breed:</div>
								<Button 
									variant="contained" 
									color="primary"
									sx={{mx: 2}} 
									onClick={sorDogsByBreed}
								>
									{`${!isAscending ? 'Ascending' : 'Descending'}`}
								</Button>
							</Box>
						</Box>
						<Box display="flex" alignItems="center">
							<Box sx={{ minWidth: 200, ml: 15 }}>
								<FormControl fullWidth disabled={listOfBreeds.length === 1}>
									<InputLabel>Filter by breed</InputLabel>
									<Select
										value={filterBreed}
										label="Filter by breed"
										onChange={handleChangeBreed}
									>
										{listOfBreeds.map((breed) => (
											<MenuItem value={breed}>{breed}</MenuItem>
										))}
									</Select>
								</FormControl>
								<Tooltip title="Filter is disabled if all dogs on the page are the same breed." placement="bottom-start" arrow>
									<InfoOutlinedIcon sx={{color: 'grey'}}/>
								</Tooltip>
								<Box>
									<strong>{filterBreed}</strong> dogs: {dogs.length}
								</Box>
							</Box>
							<Box>
								<Button variant="text" color="primary" onClick={resetFilter} sx={{mb: 6, ml: 2, fontSize: '15px', backgroundColor: '#f0f0f0'}}>
									Reset filter
								</Button>
							</Box>
						</Box>
					</Box>
					<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
						<Pagination
							count={totalDogs/25}
							page={page}
							onChange={(event, page) => handleChangePage(event, page)}
							variant="text"
							shape="rounded"
							sx={{height: '50px'}}
							color="primary"
						/>
					</Box>
					<Box>
						{dogs.map((dog) => (
							// <DogCard dog={dog} key={dog.id}/>         *** DogCard as a separate component doesn't display the dog's age, breed and zip_code in the card.
							<Card sx={{ maxWidth: 500, mb: 2, width: '600px' }} key={dog.id}>
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
					<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
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
					<Box sx={{mb: 10}}>
						<Button onClick={scrollToTop} sx={{mb: 7, fontSize: '15px', fontStyle: 'italic', fontWeight: 'bold'}} value='italic'>Go to Top</Button>
					</Box>
        </Box>
    )
}

export default AllDogs;