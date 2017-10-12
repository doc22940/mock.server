// @flow
/* eslint no-inline-comments: 0*/
import React, { Component } from "react";
import Button from "spectre-ui/Button";
// import { Container } from "spectre-ui/Grid";
import type { ButtonTypeType } from "spectre-ui/Button";

class App extends Component<*, *> {
	get name(): string {
		const type: ButtonTypeType = "primary";
		// eslint-disable-next-line
		console.log("type", type);
		return "App";
	}

	render(): React$Element<*> {
		return (
			<div className="App">
				{/* <Container size="lgs"> */}
				<Button label="Button" modifier="primary" />
				{/* </Container> */}
			</div>
		);
	}
}

export default App;
