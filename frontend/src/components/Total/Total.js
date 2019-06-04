import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

export default class Total extends Component {
	render() {
		return(
			<Row>
				<Col md={6}><h2>Total</h2></Col>
				<Col md={6}><h2>{`$${this.props.price}`}</h2></Col>
			</Row>
		)
	}
}