import React, { Component } from 'react';
import { Button, Collapse, Row, Col } from 'react-bootstrap';


export default class ItemDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			itemsDetails: '',
			itemsView: ''
		};
		this.testLoop = this.testLoop.bind(this);
		this.editItem = this.editItem.bind(this);
	}
	editItem() {
		console.log("delete");
		this.props.itemContext.state.total = 0;
		//this.props.itemContext.state.editItems();
	}

	testLoop() {
		const self = this;

		this.state.itemsDetails = this.props.itemContext.state.items;
		var items = this.state.itemsDetails;

		var listItems = items.map(function (item) {
			return (
				<div>
					<img
						width={100}
						height={100}
						alt="thumbnail"
						src="https://target.scene7.com/is/image/Target/GUEST_276b9b2f-7b2b-4baf-94c9-34090e614d72?wid=488&hei=488&fmt=webp"
					/>
					<p className="cart-item">
						{item.product_names}
						<br />
						<Col md={6}>
							<strong> {item.price} </strong>
						</Col>
						<Col md={6}>
							Qty: {item.quantity}
						</Col>

						<Button onClick={self.editItem(self.props.itemContext)}>
							Delete
          				</Button>

					</p>
				</div>
			);
		});

		return listItems;
	}

	render() {
		return (
			<div>
				<Button className="item-details-button" variant="link"
					onClick={() => this.setState({ open: !this.state.open })}>
					{this.state.open === false ? `See` : `Hide`} item details
					{this.state.open === false ? ` +` : ` -`}
				</Button>

				<Collapse in={this.state.open}>
					<div>
						{this.testLoop(this)}

					</div>

				</Collapse>
			</div>
		)
	}
}