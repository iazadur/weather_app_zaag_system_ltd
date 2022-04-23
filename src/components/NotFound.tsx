
import * as React from 'react';
import not from '../assets/404.jpg';
type Props = {

};
export const NotFound = (props: Props) => {
	return (
		<div>
			<img src={not} alt="" />
		</div>
	);
};