import React from 'react';
import { AccountCircle } from '@mui/icons-material';
import {
	Button,
	IconButton,
	Menu,
	MenuItem,
	PopoverOrigin,
} from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const LoginButton = (): JSX.Element => {
	const [menuAnchorEl, setMenuAnchorEl] = React.useState<Element | null>(
		null
	);

	const history = useHistory();
	const { isAuthenticated, logoutUser } = React.useContext(AuthContext);

	const handleMenuOpen = (event: any) => setMenuAnchorEl(event.currentTarget);
	const handleMenuClose = () => setMenuAnchorEl(null);

	const login = () => history.push('/login');
	const logout = () => {
		handleMenuClose();
		logoutUser?.();
	};

	if (!isAuthenticated)
		return (
			<Button color="inherit" onClick={login}>
				Login
			</Button>
		);

	const menuPosition: PopoverOrigin = {
		vertical: 'top',
		horizontal: 'right',
	};

	return (
		<div>
			<IconButton onClick={handleMenuOpen} color="inherit">
				<AccountCircle />
			</IconButton>
			<Menu
				anchorEl={menuAnchorEl}
				anchorOrigin={menuPosition}
				transformOrigin={menuPosition}
				open={!!menuAnchorEl}
				onClose={handleMenuClose}
			>
				<MenuItem>
					<Button component={Link} to="/profile">
						{'Profile'}
					</Button>
				</MenuItem>
				<MenuItem onClick={logout}>
					<Button>{'Logout'}</Button>
				</MenuItem>
			</Menu>
		</div>
	);
};

export default LoginButton;
