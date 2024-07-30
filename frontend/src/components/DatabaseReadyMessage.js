import React from "react";
import "./DatabaseReadyMessage.css";

function DatabaseReadyMessage() {
	return (
		<div className="resourcesBody">
			<div className="containerResource">
				<h1 className="title">🚀 Hold onto your hats! 🚀</h1>
				<p className="message">
					Our database is performing its warm-up dance and will be ready to
					groove soon. Just a few moments more, we promise!
				</p>
				<p className="message">
					We're using <b>Render</b> as our server deployment, so our database
					needs a few seconds to get into the swing of things.
				</p>
				<p className="message">
					We'll be right with you. Thanks for your patience and sense of fun!
				</p>
			</div>
		</div>
	);
}

export default DatabaseReadyMessage;
