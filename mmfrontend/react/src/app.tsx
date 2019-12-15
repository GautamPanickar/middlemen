import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NavigationBar } from './components/common/navigationbar';
import { Overlay } from './components/common/overlay';
import { Footer } from './components/common/footer';
import { AppContainer } from './components/common/appcontainer';

let componentsToRender = (
	<div>
		<NavigationBar />
		<div className="container-fluid">
			<AppContainer />
			<Footer />
		</div>
		<Overlay />
	</div>
);

// Rendering into the react DOM.
ReactDOM.render(
    componentsToRender,
    document.getElementById("root")
);