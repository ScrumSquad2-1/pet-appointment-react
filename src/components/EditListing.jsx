import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

const EditListing = props => {

	const modTarget = Object.freeze(props.location.state);
	const modVisit = Object.freeze(props.location.state.visit);
	const [formData, updateFormData] = useState(modTarget);
	const [response, setResponse] = useState();

	axios.defaults.baseURL = "http://localhost:9000/api";

	const handleChange = (event) => {
		var result = event.target.value.trim();
		if (event.target.type === "checkbox") {
			result = event.target.checked;
		}
		updateFormData({
			...formData,
			[event.target.name]: result
		});
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		var url = `/appointment/${modTarget.appointmentId}`;
		console.log(formData);
		axios.put(url, formData)
			.then(function (response) {
				setResponse(response.data);
				setShow(true);
			});
	}

	const [show, setShow] = useState(false);
	const [redirect, setRedirect] = useState(null);

	const handleClose = () => {
		setShow(false);
		setRedirect("/");
	}

	const handleCancel = () => {
		setRedirect("/");
	}

	if (redirect) {
		return (
			<Redirect to={ redirect }/>
		);
	} else {
		return (
			<div className="container">
				<h2>Editing appointment (ID: {modTarget.appointmentId}, Visit ID: {modTarget.visitId} for Doctor #{ modVisit.doctorId })</h2>
				<h3>Info</h3>
					<table className="customerinfo" cellPadding="15px">
						<tbody>
							<tr>
								<th>Customer ID:</th>
								<td>{ modVisit.customerId }</td>
							</tr>
							<tr>
								<th>Pet ID:</th>
								<td>{ modVisit.petId }</td>
							</tr>
							<tr>
								<th>Visit Date:</th>
								<td>{ modVisit.visitDate }</td>
							</tr>
							<tr>
								<th>Service:</th>
								<td>{ modVisit.service }</td>
							</tr>
						</tbody>
					</table>
				<h3>Edit fields</h3>
				<div className="container" id="editfields">
					<form onSubmit={ handleSubmit }>
						<fieldset className="row mb-3">
							<legend className="col-form-label col-sm-2 pt-0"><b>Status</b></legend>
							<div className="col-sm-10">
								<div className="form-check form-switch">
									<input className="form-check-input" type="checkbox" name="completed"
										defaultChecked={ modTarget.completed } onChange={ handleChange }/>
									<label className="form-check-label" htmlFor="isCompleted">Completed?</label>
								</div>
								<div className="form-check form-switch">
									<input className="form-check-input" type="checkbox" name="paid"
										defaultChecked={ modTarget.paid } onChange={ handleChange }/>
									<label className="form-check-label" htmlFor="isPaid">Paid?</label>
								</div>
								<div className="form-check form-switch">
									<input className="form-check-input" type="checkbox" name="cancelled"
										defaultChecked={ modTarget.cancelled } onChange={ handleChange }/>
									<label className="form-check-label" htmlFor="isCancelled">Cancelled?</label>
								</div>
							</div>
						</fieldset>
						<fieldset className="row mb-3">
							<legend className="col-form-label col-sm-2 pt-0"><b>Notes</b></legend>
							<div className="input-group">
								<textarea className="form-control" name="notes"
									defaultValue={ modTarget.notes } onChange={ handleChange }></textarea>
							</div>
						</fieldset>
						<button type="submit" className="btn btn-primary">Submit</button>
						<button className="btn btn-danger" onClick={ handleCancel }>Cancel</button>
					</form>
				</div>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Success</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<p>{response}</p>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="success" onClick={handleClose}>OK</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}

};

export default EditListing;