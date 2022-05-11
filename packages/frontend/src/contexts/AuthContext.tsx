import React from 'react';
import { IUser } from '../interfaces';

export interface IAuthContext {
	isAuthenticated: boolean;
	user?: IUser;
	setUser?: (user: IUser) => void;
	logoutUser?: () => void;
}

export const AuthContext = React.createContext<IAuthContext>({
	isAuthenticated: false,
	user: undefined,
	setUser: undefined,
	logoutUser: undefined,
});
