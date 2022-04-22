// @flow 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Icountry } from '../App';

type Props = {

};
export const Search = (props: Props) => {
	const [country, setCountry] = useState<string | null>(null)
	// const [countryInfo, setCountryInfo] = useState<Icountry>()
	let navigate = useNavigate();
	console.log(country);

	const handle_country_info = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// axios.get(`https://restcountries.com/v3.1/name/${country}`)
		// 	.then(res => {
		// 		console.log(res.data);
		// 		const { name, latlng, population, capital, flags } = res.data[0]
		// 		const Idata: Icountry = {
		// 			name: name?.common,
		// 			capital: capital,
		// 			latlng: latlng,
		// 			population: population,
		// 			flags: flags.png
		// 		}
		// 		setCountryInfo(Idata)

		// 	})

		navigate(`/details/${country}`)
	}
	return (
		<>
			<div className="" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100vh" }}>
				<div className="" >
					<form
						style={{ display: 'flex', flexDirection: 'column', width: "400px", gap: "10px" }}
						onSubmit={(e: React.FormEvent<HTMLFormElement>) => handle_country_info(e)}>

						<input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setCountry(e.target.value)
						}} type="text" placeholder='Enter Country' style={{ height: "30px" }} />
						{country ? <input type="submit" value="submit" style={{ height: "25px" }} /> :
							<input type="submit" value="submit" disabled style={{ height: "25px" }} />}
					</form>


				</div>
			</div>
		</>
	);
};