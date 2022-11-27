import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import { Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem } from 'reactstrap';

function ItemMenu({ menuItems, type }) {
	return (
		<section className="col-md-4">
			<Card>
				<CardBody>
					<CardTitle className="font-weight-bold text-center"> {type} Menu</CardTitle>
					<CardText>
						Here are all the items on the {type} menu.
					</CardText>
					<ListGroup>
						{menuItems.map((items) => (
							<Link to={`/${type}/${items.id}`} key={items.id}>
								<ListGroupItem>{items.name}</ListGroupItem>
							</Link>
						))}
					</ListGroup>
					<br />
					<Link to={`/${type}/new`}>Add new {type}</Link>
				</CardBody>
			</Card>
		</section>
	);
}

export default ItemMenu;
