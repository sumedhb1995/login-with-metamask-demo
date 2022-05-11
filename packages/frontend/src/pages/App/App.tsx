import './App.css';

import React, { useEffect, useState } from 'react';

import { Login } from '../Login';
import { Profile } from '../Profile/Profile';
import jwtDecode from 'jwt-decode';
import AppHeader from './AppHeader';
import { AuthContext } from '../../contexts';
import { IAuth, IUser } from '../../interfaces';
import axios, { AxiosInstance } from 'axios';

const LS_KEY = 'login-with-metamask:auth';

interface JwtDecoded {
	payload: {
		id: string;
		publicAddress: string;
	};
}
export const App = (): JSX.Element => {
	const [auth, setAuth] = useState<IAuth | undefined>(undefined);
	const [user, setUser] = useState<IUser | undefined>(undefined);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [client, setClient] = useState<AxiosInstance | undefined>(undefined);

	useEffect(() => {
		// Access token is stored in localstorage
		const ls = window.localStorage.getItem(LS_KEY);
		if (ls) {
			setAuth(JSON.parse(ls));
		} else {
			setIsAuthenticated(false);
		}
	}, []);

	const handleLoggedIn = (auth: IAuth) => {
		localStorage.setItem(LS_KEY, JSON.stringify(auth));
		const {
			payload: { id },
		} = jwtDecode<JwtDecoded>(auth.accessToken);

		fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, {
			headers: {
				Authorization: `Bearer ${auth.accessToken}`,
			},
		})
			.then((response) => response.json())
			.then((user) => {
				setUser(user);
				const client = axios.create({
					baseURL: process.env.REACT_APP_BACKEND_URL,
					headers: {
						Authorization: `Bearer ${auth.accessToken}`,
					},
				});
				setClient(client);
			})
			.catch(window.alert);

		setAuth(auth);
		setIsAuthenticated(true);
	};

	const handleLoggedOut = () => {
		localStorage.removeItem(LS_KEY);
		setAuth(undefined);
	};

	return (
		<div className="App">
			<AuthContext.Provider value={{ isAuthenticated, user, client }}>
				<AppHeader />
				<div className="App-intro">
					{auth ? (
						<Profile auth={auth} onLoggedOut={handleLoggedOut} />
					) : (
						<Login onLoggedIn={handleLoggedIn} />
					)}
				</div>
			</AuthContext.Provider>
		</div>
	);
};
