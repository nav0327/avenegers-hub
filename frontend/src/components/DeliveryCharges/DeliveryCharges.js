import React, { Component } from 'react';
import { Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';

var styles = {
	deliveryCharges: {
		textDecoration: 'underline'
	},
	afterDeliveryCharges: {
		color: 'red',
		fontWeight: 800
	}
};

export default class DeliveryCharges extends Component {
	render() {
		const tooltip = (
			<Tooltip id="tooltip">
				<p>Every item has a delivery charge of $5.</p> 
			</Tooltip>
		);
		return(
			<Row className="show-grid">
				<Col md={6}>
					<OverlayTrigger placement="bottom" overlay={tooltip}>
						<div style={styles.deliveryCharges}>Delivery Charges</div>
					</OverlayTrigger>
				</Col>
				<Col style={styles.afterDeliveryCharges} md={6}> 
					{`$${this.props.price}`}
				</Col>
			</Row>
		)
	}
}