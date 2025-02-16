export interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

export const baseUrl = ' https://frontend-take-home-service.fetch.com';

export const fetchDogIds = async (page: number) => {
    const idsResponse = await fetch(`${baseUrl}/dogs/search?size=25&from=${(page - 1) * 25}`, {
			method: 'GET',
			credentials: "include",
			headers: {
					'Content-Type': 'application/json'
			},
	});

	const data = await idsResponse.json();
	const ids = data.resultIds;

	return ids;
}