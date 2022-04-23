// @flow 
import { Backdrop, Button, Card, CardContent, CardMedia, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
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
	const [open, setOpen] = React.useState(false);
	let params = useParams();
	console.log(params.country);
	let navigate = useNavigate()
	React.useEffect(() => {
		setOpen(true);
		axios.get(`https://restcountries.com/v3.1/name/${params.country}`)
			.then(res => {

				const { name, latlng, population, capital, flags } = res.data[0]
				const Idata: Icountry = {
					name: name?.common,
					capital: capital,
					latlng: latlng,
					population: population,
					flags: flags.png
				}
				setCountryInfo(Idata)
				setOpen(false);
			})
			.catch(error => {
				setOpen(false);


				if (error.response.data.status === 404) {
					navigate('/not_found');
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: 'Oops...',
						text: error?.response?.data?.message,
						showConfirmButton: false,
						timer: 3500
					})
				}
			})
	}, [params.country, navigate])

	const call_weather = (capital: string | undefined) => {
		setOpen(true);
		axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`)
			.then(res => {


				const { weather_icons, temperature, wind_speed, precip } = res.data?.current
				const weather_data: Iweather = {
					temperature: temperature,
					weather_icons: weather_icons[0],
					wind_speed: wind_speed,
					precip: precip
				}
				setWeatherInfo(weather_data)
				setOpen(false);
			})
			.catch(error => {

				console.log(error.response);
				setOpen(false);
			})
	}



	return (
		<>
			<Container maxWidth={'md'} style={{ marginTop: '200px' }}>
				<Grid container spacing={2}>
					<Grid item xs={6}>

						{countryInfo &&
							<>
								<Card sx={{ maxWidth: 345 }}>
									<CardMedia
										component="img"
										height="140"
										image={countryInfo?.flags}
										alt="green iguana"
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="div">
											Name: {countryInfo?.name}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											Capital: {countryInfo?.capital.map(i => i + ", ")}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											Population: {countryInfo?.population}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											Lating: {`latitude: ${countryInfo?.latlng[0]} longitude: ${countryInfo?.latlng[1]}`}
										</Typography>
									</CardContent>

								</Card>
							</>}
					</Grid>
					<Grid item xs={6}>
						<Stack component={'div'} spacing={2} direction='column'>

							{countryInfo && <Button onClick={() => call_weather(countryInfo?.capital[0])} variant='contained' >Capital Weather</Button>}
							{weatherInfo && <>
								<Card sx={{ maxWidth: 345 }}>
									<CardMedia
										component="img"
										height="140"
										src={weatherInfo?.weather_icons}
										alt="green iguana"
									/>
									<CardContent>
										<Typography gutterBottom variant="h6" component="div">
											Temperature: {weatherInfo?.temperature}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											Precip: {weatherInfo?.precip}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											Wind Speed: {weatherInfo?.wind_speed}
										</Typography>

									</CardContent>

								</Card>

							</>}
						</Stack>
					</Grid>

				</Grid>
			</Container>

			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={open}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</>
	);
};