// @flow 
import axios from 'axios';
import * as React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Icountry } from '../App';
type Props = {

};
interface Iweather {
	weather_icons: string,
	temperature: number,
	precip: number,
	wind_speed: number
}
export const CountryInformation = (props: Props) => {
	const [countryInfo, setCountryInfo] = React.useState<Icountry>()
	const [weatherInfo, setWeatherInfo] = React.useState<Iweather>()
	let params = useParams();
	console.log(params.country);

	React.useEffect(() => {
		axios.get(`https://restcountries.com/v3.1/name/${params.country}`)
			.then(res => {
				console.log(res.data);
				const { name, latlng, population, capital, flags } = res.data[0]
				const Idata: Icountry = {
					name: name?.common,
					capital: capital,
					latlng: latlng,
					population: population,
					flags: flags.png
				}
				setCountryInfo(Idata)

			})
	}, [params.country])

	const call_weather = (capital: string | undefined) => {
		axios.get(`http://api.weatherstack.com/current?access_key=4b618d650e421d5e0c2d544f97dc6088&query=${capital}`)
			.then(res => {
				const { weather_icons, temperature, wind_speed, precip } = res.data?.current
				const weather_data: Iweather = {
					temperature: temperature,
					weather_icons: weather_icons[0],
					wind_speed: wind_speed,
					precip: precip
				}
				setWeatherInfo(weather_data)
			})
	}
	return (
		<>
			<div className="" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: "100vh" }}>
				<div className="" style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: "20px" }} >
					<div style={{ display: 'flex', flexDirection: 'column', width: "400px", gap: "10px" }}>

						<h3>Name: {countryInfo?.name}</h3>
						<h3>Capital: {countryInfo?.capital.map(i => i + ", ")}</h3>
						<h3>Population: {countryInfo?.population}</h3>
						<h3>Lating: {countryInfo?.latlng.map(i => i + ", ")}</h3>
						<img src={countryInfo?.flags} alt="" />
					</div>

					<div style={{ display: 'flex', flexDirection: 'column', width: "400px", gap: "10px" }}>

						<button onClick={() => call_weather(countryInfo?.capital[0])}>Capital Weather</button>
						<h3>Temperature: {weatherInfo?.temperature}</h3>
						<h3>Precip: {weatherInfo?.precip}</h3>
						<h3>Wind Speed: {weatherInfo?.wind_speed}</h3>

						<img src={weatherInfo?.weather_icons} alt="" />
					</div>


				</div>
			</div>
			<div className="" style={{ width: '100%', textAlign: 'center' }}>
				<NavLink to='/' style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px' }}>Go back</NavLink>
			</div>

		</>
	);
};