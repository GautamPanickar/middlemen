import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NavigationBar } from './components/common/navigationbar';

let componentsToRender = (
	<div>
		<NavigationBar />
	</div>
);

// Rendering into the react DOM.
ReactDOM.render(
    componentsToRender,
    document.getElementById("root")
);