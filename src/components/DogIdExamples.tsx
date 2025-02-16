import React, { useEffect, useState } from 'react';
import { fetchDogIds as fetchDogIdsFromApi } from "./common";
import { Box } from '@mui/material';

const DogIdExamples: React.FC = () => {

    const [ids, setIds] = useState([]);

    const fetchDogIds = async (page: number) => {
			try {
				const ids = await fetchDogIdsFromApi(page);
				setIds(ids);
			} catch (error) {	
				console.error('Error fetching data:', error);
			}
    }

    useEffect(() => {
        fetchDogIds(1);
    }, [])


    return (
			<>
			<Box sx={{ml: '40%'}}>
				<table>
					<thead>
						<tr>
							<th>Dog Id</th>
						</tr>
					</thead>
					<tbody>
						{ids.map((item) => (
							<tr key={item}>
								<td>{`"${item}",`}</td>
							</tr>
						))}
					</tbody>
				</table>
			</Box>
			</>
    )
}

export default DogIdExamples;