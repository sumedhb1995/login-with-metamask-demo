import './App.css';

import React, { useEffect, useState } from 'react';

import { Login } from '../Login';
import { Profile } from '../Profile/Profile';
import jwtDecode from 'jwt-decode';
import AppHeader from './AppHeader';
import { AuthContext } from '../../contexts';
import { IAuth, IUser } from '../../interfaces';
import axios from 'axios';
import { Route, useHistory } from 'react-router-dom';
import Home from '../Home';

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
	const history = useHistory();

	useEffect(() => {
		// Access token is stored in localstorage
		const ls = window.localStorage.getItem(LS_KEY);
		if (ls) {
			const auth = JSON.parse(ls);
			setAuth(JSON.parse(ls));
			handleLoggedIn(auth);
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
				axios.defaults.headers.common[
					'Authorization'
				] = `Bearer ${auth.accessToken}`;
			})
			.catch(window.alert);

		setAuth(auth);
		setIsAuthenticated(true);
		history.push('/profile');
	};

	const handleLoggedOut = () => {
		localStorage.removeItem(LS_KEY);
		setAuth(undefined);
		setIsAuthenticated(false);
		history.push('/login');
	};

	return (
		<div className="App">
			<AuthContext.Provider
				value={{
					isAuthenticated,
					user,
					setUser,
					logoutUser: handleLoggedOut,
				}}
			>
				<AppHeader />
				<div className="App-intro">
					{auth ? (
						<main>
							<Route path="/" exact={true} component={Home} />
							<Route
								path="/profile"
								exact={true}
								render={() => (
									<Profile onLoggedOut={handleLoggedOut} />
								)}
							/>
						</main>
					) : (
						<main>
							<Route path="/" exact={true} component={Home} />
							<Route
								path="/*"
								render={() => (
									<Login onLoggedIn={handleLoggedIn} />
								)}
							/>
						</main>
					)}
				</div>
			</AuthContext.Provider>
		</div>
	);
};
