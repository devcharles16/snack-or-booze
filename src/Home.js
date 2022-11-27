import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

function Home({ menuItems }) {
	return (
		<section className="col-md-8">
			<Card>
				<CardBody className="text-center">
					<CardTitle>
						<h3 className="font-weight-bold">Welcome to Silicon Valley's premier dive cafe!</h3>
					</CardTitle>
					<span>
						We have {menuItems.snacks.length} snacks and {menuItems.drinks.length} drinks.
					</span>
				</CardBody>
			</Card>
		</section>
	);
}

export default Home;
