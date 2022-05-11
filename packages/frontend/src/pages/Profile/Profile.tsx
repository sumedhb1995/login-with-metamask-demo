import './Profile.css';

import React, { useState } from 'react';
import Blockies from 'react-blockies';
import { IUser } from '../../interfaces';
import { AuthContext } from '../../contexts';
import axios from 'axios';
import { Button, Input, Typography } from '@mui/material';

interface Props {
	onLoggedOut: () => void;
}

interface State {
	loading: boolean;
	username: string;
}

export const Profile = ({ onLoggedOut }: Props): JSX.Element => {
	const { user, setUser } = React.useContext(AuthContext);
	const [state, setState] = useState<State>({
		loading: false,
		username: user?.username ?? '',
	});

	const handleChange = ({
		target: { value },
	}: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, username: value });
	};

	const handleSubmit = () => {
		const { username } = state;

		setState({ ...state, loading: true });

		if (!user) {
			window.alert(
				'The user id has not been fetched yet. Please try again in 5 seconds.'
			);
			return;
		}

		axios
			?.patch(`${process.env.REACT_APP_BACKEND_URL}/users/${user.id}`, {
				username,
			})
			.then((response) => response.data as IUser)
			.then((user) => {
				setState({ ...state, loading: false });
				setUser?.(user);
			})
			.catch((err) => {
				window.alert(err);
				setState({ ...state, loading: false });
			});
	};

	const { loading } = state;

	const username = user && user.username;

	return (
		<div className="Profile">
			<Typography style={{ margin: 20 }}>
				Logged in as <Blockies seed={user?.publicAddress} />
			</Typography>
			<Typography>
				My username is {username ? <pre>{username}</pre> : 'not set.'}
				My publicAddress is <pre>{user?.publicAddress}</pre>
			</Typography>
			<div>
				<Typography>Change username: </Typography>
				<Input
					name="username"
					style={{ margin: 10 }}
					onChange={handleChange}
				/>
				<Button
					style={{ margin: 10 }}
					disabled={loading}
					variant="outlined"
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</div>
			<Typography>
				<Button
					style={{ margin: 10 }}
					variant="contained"
					onClick={onLoggedOut}
				>
					Logout
				</Button>
			</Typography>
		</div>
	);
};
