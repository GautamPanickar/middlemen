import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NavigationBar } from './components/common/navigationbar';

// Importing CSS - Seems like this is the only way it is working
import '../content/css/app.css';
import '../content/css/bootstrap.min.css';
//import '../content/font/all.min.css';

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