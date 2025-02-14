import { List } from "@mui/icons-material"
import React from "react"
import { Card, CardMedia, CardContent, Typography, ListItem, ListItemText } from "@mui/material"
import { Dog } from './common';

interface DogCardProps {
  dog: Dog;
}

const DogCard: React.FC<DogCardProps> = ({ dog }) => {
	return (
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
				<Typography sx={{ color: 'text.secondary' }}>
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
	)
}

export default DogCard;