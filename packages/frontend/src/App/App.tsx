import './App.css';

import React, { useEffect, useState } from 'react';

import { Login } from '../Login';
import { Profile } from '../Profile/Profile';
import jwtDecode from 'jwt-decode';
import AppHeader from './AppHeader';
import { AuthContext } from '../contexts';
import { IUser } from '../interfaces';
import axios, { AxiosInstance } from 'axios';

const LS_KEY = 'login-with-metamask:auth';

interface JwtDecoded {
	payload: {
		id: string;
		publicAddress: string;
	};
}

export const App = (): JSX.Element => {
	const [accessToken, setAccessToken] = useState<string | undefined>(
		undefined
	);
	const [user, setUser] = useState<IUser | undefined>(undefined);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [client, setClient] = useState<AxiosInstance | undefined>(undefined);

	useEffect(() => {
		// Access token is stored in localstorage
		const ls = window.localStorage.getItem(LS_KEY);
		const auth = ls && JSON.parse(ls).accessToken;
		setAccessToken(auth);
	}, []);

	const handleLoggedIn = (accessToken: string) => {
		localStorage.setItem(LS_KEY, JSON.stringify(accessToken));
		const {
			payload: { id },
		} = jwtDecode<JwtDecoded>(accessToken);

		fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => response.json())
			.then((user) => {
				setUser(user);
				const client = axios.create({
					baseURL: process.env.REACT_APP_BACKEND_URL,
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});
				setClient(client);
			})
			.catch(window.alert);

		setAccessToken(accessToken);
		setIsAuthenticated(true);
	};

	const handleLoggedOut = () => {
		localStorage.removeItem(LS_KEY);
		setAccessToken(undefined);
	};

	return (
		<div className="App">
			<AuthContext.Provider value={{ isAuthenticated, user, client }}>
				<AppHeader />
				<div className="App-intro">
					{accessToken ? (
						<Profile
							accessToken={accessToken}
							onLoggedOut={handleLoggedOut}
						/>
					) : (
						<Login onLoggedIn={handleLoggedIn} />
					)}
				</div>
			</AuthContext.Provider>
		</div>
	);
};
