import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './Home';
import SnackOrBoozeApi from './Api';
import NavBar from './NavBar';
import { Route, Switch } from 'react-router-dom';
import ItemMenu from './MenuItems';
import ItemForm from './AddForm';
import Snack from './Menu';

function App() {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ menuItems, setMenuItems ] = useState([]);

	useEffect(() => {
		async function getMenuItems() {
			let snacks = await SnackOrBoozeApi.getMenuItems('snacks');
			let drinks = await SnackOrBoozeApi.getMenuItems('drinks');
			setMenuItems({ drinks, snacks });
			setIsLoading(false);
		}
		getMenuItems();
	}, []);

	const addToMenuItems = async (type, ItemData) => {
		await SnackOrBoozeApi.postMenuItems(type, ItemData);
	};

	if (isLoading) {
		return <p>Loading &hellip;</p>;
	}

	return (
		<div className="App">
			<BrowserRouter>
				<NavBar />
				<main>
					<Switch>
						<Route path="/"> 
							<Home menuItems={menuItems} />
						</Route>
						<Route exact path="/snacks">
							<ItemMenu menuItems={menuItems.snacks} type="snacks" title="Snacks" />
						</Route>
						<Route exact path="/drinks">
							<ItemMenu menuItems={menuItems.drinks} type="drinks" title="Drinks" />
						</Route>
						<Route exact path="/snacks/new">
							<ItemForm type="snacks" addToMenuItems={addToMenuItems} />
						</Route>
						<Route exact path="/drinks/new">
							<ItemForm type="drinks" addToMenuItems={addToMenuItems} />
						</Route>
						<Route path="/snacks/:id">
							<Snack items={menuItems.snacks} cantFind="/snacks" />
						</Route>
						<Route path="/drinks/:id">
							<Snack items={menuItems.drinks} cantFind="/drinks" />
						</Route>
						<Route>
							<p>Hmmm. I can't seem to find what you want.</p>
						</Route>
					</Switch>
				</main>
			</BrowserRouter>
		</div>
	);
}

export default App;
