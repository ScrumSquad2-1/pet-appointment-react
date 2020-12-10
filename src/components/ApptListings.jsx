import React from 'react';
import ApptListing from './ApptListing';

const ApptListings = props => {
	return (
		<table className="itemlist" cellPadding="10">
			<thead>
				<tr>
					<th>ID</th>
					<th>Visit ID</th>
					<th>Appt. status</th>
					<th>Payment status</th>
					<th>Notes</th>
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