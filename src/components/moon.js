import React, {Component} from 'react';
import moonImage from '../img/moon.png';

class MoonContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			results: []
		};
	}

	// Child = ({ match }) => (
	// 	<div>
	// 		<h3>Date: {match.params.dt.replace(/-/g, '/')} </h3>
	// 	</div>
	// );
	componentDidMount() {
		fetch('https://api.usno.navy.mil/rstt/oneday?date=01/01/2019&loc=Springfield,%20Mo')
			.then(res => res.json())
			.then(
				results => {
					this.setState({
						isLoaded: true,
						results: results
					});
				},
				error => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			);
	}

	render() {
		const {error, isLoaded, results} = this.state;
		if (error) {
			return (
				<div className="content">
					<div>Error: {error.message}</div>
				</div>
			);
		} else if (!isLoaded) {
			return (
				<div className="content">
					<div>Loading...</div>
				</div>);
		} else {
			let moonPhase;
			if (results.curphase === undefined) {
				moonPhase = results.closestphase.phase;
			} else {
				moonPhase = results.curphase;
			}

			return (
				<div className="content">
					<div id="moonRise">Moon Rise: {results.moondata[0].time.toString().slice(0, -3)}</div>
					<div id="moonImage">
						<img src={moonImage} alt={'The Moon'}/>
					</div>
					<div id="moonSet">Moon Set: {results.moondata[2].time.toString().slice(0, -3)}</div>
				</div>
			);
		}
	}
}

export default MoonContent;
