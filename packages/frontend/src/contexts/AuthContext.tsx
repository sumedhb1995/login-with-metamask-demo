import { AxiosInstance } from 'axios';
import React from 'react';
import { IUser } from '../interfaces';

export interface IAuthContext {
	isAuthenticated: boolean;
	user?: IUser;
	client?: AxiosInstance;
}

export const AuthContext = React.createContext<IAuthContext>({
	isAuthenticated: false,
	user: undefined,
	client: undefined,
});
