import { Button, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
type Props = {

};
export const Search = (props: Props) => {
	const [country, setCountry] = useState<string | null>(null)
	let navigate = useNavigate();
	console.log(country);

	const handle_country_info = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		navigate(`/details/${country}`)
	}
	return (
		<>
			<div className="" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100vh" }}>
				<div className="" >
					<form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handle_country_info(e)}>


						<Stack spacing={2} direction='column'>
							<TextField
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setCountry(e.target.value)
								}}
								required
								id="outlined-required"
								label="Enter Country Name"
								placeholder='Enter Country'
							/>
							{country ? <Button variant="contained" type='submit' >Search</Button> :
								<Button variant="contained" disabled >Search</Button>}
						</Stack>
					</form>


				</div>
			</div>
		</>
	);
};