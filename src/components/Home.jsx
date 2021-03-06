import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ApptListings from './ApptListings'

const Home = props => {

	axios.defaults.baseURL = "http://localhost:9000/api"

	const [appts, setAppts] = useState([]);

	useEffect(() => {
		axios.get("/appointment")
		.then(response => {
			console.log(response);
			setAppts(response.data);
		});
	},[])
	const modify = item => {
		const filteredappt = appts.filter(entry => entry.appointmentId === item);
		return filteredappt[0];
	}

	return(
		<div className="container">
			<h2>List of appointments</h2>
			<ApptListings appts={ appts } modify={ modify }/>
		</div>
	);

}

export default Home;