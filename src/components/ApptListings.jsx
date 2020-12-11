import React from 'react';
import ApptListing from './ApptListing';

const ApptListings = props => {
	return (
		<table className="apptlist" cellPadding="10">
			<thead>
				<tr>
					<th>ID</th>
					<th>Visit&nbsp;ID (Date)</th>
					<th>Doctor ID</th>
					<th colSpan="2">Customer Info</th>
					<th colSpan="2">Status</th>
					<th colSpan="2">Notes</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{props.appts.map(item => {
					return(
						<ApptListing
							key={item.appointmentId}
							id={item.appointmentId}
							visitid={item.visitId}
							visit={item.visit}
							cancelled={item.cancelled}
							completed={item.completed}
							paid={item.paid}
							notes={item.notes}
							modify={props.modify}
						/>
					)
				})}
			</tbody>
		</table>
	);
};

export default ApptListings;