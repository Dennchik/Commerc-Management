import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import { TransitionProvider } from '../context/TransitionContext';
import TransitionComponent from '../components/Transition';

const Router = () => {
	return (
		<TransitionProvider>
			<Routes>
				<Route path='/'>
					<TransitionComponent>
						<HomePage />
					</TransitionComponent>
				</Route>
			</Routes>
		</TransitionProvider>
	);
};