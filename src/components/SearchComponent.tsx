import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Card, CardContent, CardMedia, Grid, List, ListItem, ListItemText, Pagination, Typography } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// import Card from "react-bootstrap/Card";
// import Stack from "react-bootstrap/Stack";
// import "bootstrap/dist/css/bootstrap.min.css";
// import ImageRenderer from "./ImageRenderer.tsx";
// import { GridApi } from 'ag-grid-community';


interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

interface Dog {
	id: string
	img: string
	name: string
	age: number
	zip_code: string
	breed: string
}

const SearchComponent: React.FC<SearchProps> = ({ placeholder = 'Search' }) => {

  const [columnDefs] = useState([
    { headerName: 'Name', 
			field: 'name' 
		},
    { headerName: 'Picture', 
			field: 'img',
			flex: 1,
			// cellRenderer: ImageRenderer,
		},
    { headerName: 'Age', 
			field: 'age' 
		},
		{ headerName: 'Breed', 
			field: 'breed' 
		},
		{ headerName: 'Zip Code', 
			field: 'zip_code' 
		}
  ]);
  const [searchText, setSearchText] = useState('');
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState<Dog[]>([]);
	// console.log('rowData:', rowData);
	const dogsPerPage = 10;

	const [page, setPage] = useState(1);
	const pageCount = Math.ceil(rowData.length / dogsPerPage);

	const startIndex = (page - 1) * dogsPerPage;
  const endIndex = startIndex + dogsPerPage;
  const displayedItems = rowData.slice(startIndex, endIndex);

	// const [gridApi, setGridApi] = useState<GridApi | null>(null);

	const handlePageChange = (event, value) => {
    setPage(value);
  };


const fetchData = async (searchText = '', page = 1, pageSize = 25) => {

		

    console.log('searchText:', searchText);
    let dataArray = searchText === '' ? [] : searchText.replaceAll(/['"`\s]/g, '').split(',');
    console.log('dataArray:', dataArray);
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
        console.log('Fetched data:', data);
        setRowData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

  useEffect(() => {
    fetchData();
  }, []);




  


	// const [searchTerm, setSearchTerm] = useState('');
  const [gridData, setGridData] = useState<any[]>([]);
  // const [columnDefs, setColumnDefs] = useState<any[]>([]);

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
        console.log('searchText:', searchText);
        fetchData(searchText);
  };

	// const onGridReady = () => {
  //   gridRef.current!.api.paginationGetPageSize();
  // };

	const onPaginationChanged = () => {
    const currentPage = gridRef.current!.api.paginationGetCurrentPage();
    fetchData(searchText, currentPage);
  };

	// const onGridReady = (params) => {
  //   setGridApi(params.api);
  // };

  return (
		<Box sx={{mt: 2, border: '1px solid red', height: '50px'}}>
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
    	    />
			<Button variant="contained" color="primary" onClick={handleSearch}>
					Search
			</Button>

			<Box>
				{rowData.map((dog) => (
					<Card sx={{ maxWidth: 345, mb: 2 }}>
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