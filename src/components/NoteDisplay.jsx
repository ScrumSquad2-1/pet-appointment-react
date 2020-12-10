import React from 'react';

const NoteDisplay = props => {
	if (props.note) {
		return (
			<span>
				{ props.note }
			</span>
		);
	} else {
		return (
			<span>
				(<i>none</i>)
			</span>
		);
	}
};

export default NoteDisplay;