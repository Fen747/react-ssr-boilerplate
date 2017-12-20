import React from 'react';

class Home extends React.Component {
	state = {};

	render(){
		const { state } = this.state;
		const { props } = this.props;

		return (
			<div>
				Hello World !
			</div>
		);
	}
}

export default Home;