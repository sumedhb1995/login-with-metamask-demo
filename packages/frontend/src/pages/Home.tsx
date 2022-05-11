import React from 'react';
import { Typography } from '@mui/material';
import logo from '../assets/logo.png';

const Home = (): JSX.Element => {
	return (
		<div>
			<img style={{ height: 200 }} src={logo} alt="Logo" />
			<Typography variant="h4">Welcome to PostMint!</Typography>
		</div>
	);
};

export default Home;
