import React 						from 'react';
import Switch 						from 'react-router-dom/Switch';
import Route 						from 'react-router-dom/Route';
import NavLink 						from 'react-router-dom/NavLink';
import withRouter 					from 'react-router-dom/withRouter';
import { ToastContainer, toast } 	from 'react-toastify';
import { connect } 					from 'react-redux';

import Home 						from '/imports/ui/Home';
import DynamicImporter 				from '/imports/ui/DynamicImporter';

global.Alert = {
	error: 	 msg => toast.error( msg, { position: toast.POSITION.BOTTOM_LEFT } ),
	success: msg => toast.success( msg, { position: toast.POSITION.BOTTOM_LEFT } ),
	info: 	 msg => toast.info( msg, { position: toast.POSITION.BOTTOM_LEFT } ),
	warn: 	 msg => toast.warn( msg, { position: toast.POSITION.BOTTOM_LEFT } ),
};

const NotFound = DynamicImporter( f => import('/imports/ui/NotFound') );

const NotAuthen = ({ userId, component, ...rest }) => {
	const _CompToRender = props => {
	  if ( !userId ) return ( React.createElement( component, {...props} ) );
	  else return ( <Redirect to="/" /> );
	};

	return ( <Route render={_CompToRender} {...rest} /> );
};

const Authenticated = ({ userId, component, ...rest }) => {
	const _CompToRender = props => {
	  if ( userId ) return ( React.createElement( component, {...props, userId } ) );
	  else return ( <Redirect to="/login" /> );
	};

	return ( <Route render={_CompToRender} {...rest} /> );
};

class App extends React.Component {
	state = {};

	render(){
		const { state } = this.state;
		const { props } = this.props;

		return (
			<div>
				<ToastContainer />
				<main>
					<Switch>
						<Route component={Home} exact path="/" />
						<Route component={NotFound} />	
					</Switch>
				</main>
			</div>
		);
	}
}

const mapStateToProps = ({ appPageLabel }) => ({ appPageLabel });

const mapDispatchToProps = dispatch => ({
	/*
	changePageLabel( label ){
		dispatch( actions.changePageLabel( label ) )
	}
	*/
});

export default App;

//export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
