import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "./OrderDetails.css";

export default class OrderDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userDetails: this.props.parentContext.state.userInfo,
			orderDetail: [],
			navBar: ''
		};

	}
	
	componentDidMount() {
		var apiBaseUrl = "http://localhost:4000/";
		var self = this;
		var payload = {
			"userId": this.state.userDetails['id']
		}
		axios.post(apiBaseUrl + 'fetchOrderDetails', payload)
			.then((response) => {

				this.state.orderDetail = response.data;
				console.log(this.state.orderDetail);
				//if (response.data.code === 200) {
				console.log("Update successful");
				
				var listItems = this.state.orderDetail.map(function (order) {
					return (
							<TableRow>
							<TableCell>{order.first_name}</TableCell>
							<TableCell>{order.email}</TableCell>
							<TableCell>{order.phoneNo}</TableCell>
							<TableCell>{order.Address}</TableCell>
							<TableCell>{order.City}</TableCell>
							<TableCell>{order.State}</TableCell>
							<TableCell>{order.Zip}</TableCell>
							<TableCell>{order.productNames}</TableCell>
							<TableCell>{order.totalPrice}</TableCell>
							</TableRow>
						
					);

				})
				var mainNav = <TableBody>{listItems}</TableBody>;
				this.setState({ navBar: mainNav });
				console.log(this.state.navBar);
				//}

			})
			.catch(function (error) {
				console.log(error);
			});
	
		}
		
	render() {
		
		return (
			<Paper  class = "orderDetail">
				<Table >
					<TableHead>
						<TableRow>
							<TableCell>Recipient's Name</TableCell>
							<TableCell align="right">Recipient's Email</TableCell>
							<TableCell align="right">Recipient's PhoneNo</TableCell>
							<TableCell align="right">Recipient's Address</TableCell>
							<TableCell align="right">Recipient's City</TableCell>
							<TableCell align="right">Recipient's State</TableCell>
							<TableCell align="right">Recipient's Zip</TableCell>
							<TableCell align="right">Products Bought</TableCell>
							<TableCell align="right">Total Price</TableCell>
						</TableRow>
					</TableHead>
				
						{this.state.navBar}
					
				</Table>
			</Paper>
		)
	}
}
