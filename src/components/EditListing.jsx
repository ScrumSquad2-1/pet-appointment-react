import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

const EditListing = props => {

	const modTarget = Object.freeze(props.location.state);
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
	const handleShow = () => setShow(true);

	if (redirect) {
		return (
			<Redirect to={ redirect }/>
		);
	} else {
		return (
			<div className="container">
				<h2>Editing appointment (ID: {modTarget.appointmentId}, Visit ID: {modTarget.visitId})</h2>
				<form onSubmit={ handleSubmit }>
					<fieldset className="row mb-3">
						<legend className="col-form-label col-sm-2 pt-0">Status</legend>
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
						<legend className="col-form-label col-sm-2 pt-0">Notes</legend>
						<div className="input-group">
							<textarea className="form-control" name="notes"
								defaultValue={ modTarget.notes } onChange={ handleChange }></textarea>
						</div>
					</fieldset>
					<button type="submit" className="btn btn-primary">Submit</button>
					&nbsp;&nbsp;<Link to="/">Cancel</Link>
				</form>

				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Success</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<p>{response}</p>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>OK</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}

};

export default EditListing;