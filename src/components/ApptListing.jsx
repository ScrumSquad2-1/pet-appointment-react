import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

const ApptListing = props => {

	const [redirect, setRedirect] = useState(null);
	const [target, setTarget] = useState();

	const handleClick = () => {
		let target = props.modify(props.id);
		console.log(target);
		setTarget(target);
		setRedirect("/edit");
	}

	const ApptStatus = props => {
		if(props.cancelled) {
			return <span>Cancelled</span>;
		} else {
			if(props.completed) {
				return <span>Completed</span>;
			} else {
				return <span>Pending</span>;
			}
		}
	}

	const PaymentStatus = props => {
		if(props.paid) {
			return <span>Paid</span>;
		} else {
			return <span>Unpaid</span>;
		}
	}

	if (redirect) {
		return(
			<Redirect 
				to={{
					pathname: redirect,
					state: target
				}}
			/>
		);
	} else {
		return(
			<tr>
				<td>{props.id}</td>
				<td>{props.visitid}</td>
				<td><ApptStatus cancelled={props.cancelled} completed={props.completed}/></td>
				<td><PaymentStatus paid={props.paid}/></td>
				<td>{props.notes}</td>
				<td><Button variant="primary" onClick={handleClick}>Edit</Button></td>
			</tr>
		);
	}

}

export default ApptListing;