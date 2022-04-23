
import { Container } from '@mui/material';
import * as React from 'react';
import not from '../assets/404.jpg';
type Props = {

};
export const NotFound = (props: Props) => {
	return (
		<Container maxWidth={"md"}>
			<img src={not} alt="" />
		</Container>
	);
};