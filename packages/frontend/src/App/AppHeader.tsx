import React from 'react';
import { AppBar, Button, Toolbar } from '@mui/material';
import LoginButton from '../components/LoginButton';
import { Link } from 'react-router-dom';

import logo from '../assets/logo-transparent.png';

const AppHeader = (): JSX.Element => (
	<AppBar position="static" style={{ backgroundColor: 'black' }}>
		<Toolbar>
			<img style={{ height: 200 }} src={logo} alt="Logo" />
			<div
				style={{
					flex: 1,
				}}
			/>
			<Button color="inherit" component={Link} to="/">
				Home
			</Button>
			<Button color="inherit" component={Link} to="/campaigns">
				Campaigns
			</Button>
			<LoginButton />
		</Toolbar>
	</AppBar>
);

export default AppHeader;
