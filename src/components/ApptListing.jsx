import React, { useState, Fragment } from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import NoteDisplay from './NoteDisplay';

const ApptListing = props => {

	const [redirect, setRedirect] = useState(null);
	const [target, setTarget] = useState();
	const [visit, setVisit] = useState({
		"id": 0,
		"visitDate": "(unavailable)",
		"service": "(unavailable)",
		"petId": 0,
		"customerId": 0,
		"doctorId": 0
	});

	axios.defaults.baseURL = "http://localhost:9000/api";

	useEffect(() => {
		axios.get(`/visit/${props.visitid}`)
		.then(response => {
			console.log(response);
			setVisit(response.data);
		});
	},[])

	const handleClick = () => {
		let targetAppt = props.modify(props.id);
		let targetVisit = visit;
		var target = {};
		target[0] = targetAppt;
		target[1] = targetVisit;
		console.log(target);
		setTarget(target);
		setRedirect("/edit");
	}

	const ApptStatus = props => {
		if(props.cancelled) {
			return <span className="redtext">Cancelled</span>;
		} else {
			if(props.completed) {
				return <span className="greentext">Completed</span>;
			} else {
				return <span className="graytext">Pending</span>;
			}
		}
	}

	const PaymentStatus = props => {
		if(props.paid) {
			return <span className="greentext">Paid</span>;
		} else {
			return <span className="redtext">Unpaid</span>;
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
			<Fragment>
				<tr>
					<th rowSpan="2">{props.id}</th>
					<td rowSpan="2"><b>{props.visitid}</b> ({ visit.visitDate })</td>
					<td rowSpan="2">{visit.doctorId}</td>
					<th>Customer:</th>
					<td>{visit.customerId}</td>
					<th>Appt:</th>
					<td><ApptStatus cancelled={props.cancelled} completed={props.completed}/></td>
					<th>Service:</th>
					<td><NoteDisplay note={visit.service}/></td>
					<td rowSpan="2"><Button variant="primary" onClick={handleClick}>Edit</Button></td>
				</tr>
					<th>Pet:</th>
					<td>{visit.petId}</td>
					<th>Payment:</th>
					<td><PaymentStatus paid={props.paid}/></td>
					<th>Notes:</th>
					<td><NoteDisplay note={props.notes}/></td>
			</Fragment>
		);
	}

}

export default ApptListing;