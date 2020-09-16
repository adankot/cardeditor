import React from 'react';
import './Editor.css';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			cost: '',
			description: '',
			type: '',
			image: '',
			attack: '',
			health: '',
			movement: ''
		};
		this.cardRef = React.createRef();
	}

	render() {
		return (
			<div className="container">
				<div className="fields-container">
					<form>
						<div className="FormField">
							<label>Name</label>
							<input id="card-name" className="FormText"
							       onChange={event => this.setState({ name: event.target.value })}/>
						</div>
						<div className="FormField">
							<label>Cost</label>
							<input id="card-cost" className="FormText"
							       onChange={event => this.setState({ cost: event.target.value })}/>
						</div>
						<div className="FormField">
							<label>Type</label>
							<input id="card-type" className="FormText"
							       onChange={event => this.setState({ type: event.target.value })}/>
						</div>
						<div className="FormField">
							<label>Image URL</label>
							<input id="card-image" className="FormText"
							       onChange={event => this.setState({ image: event.target.value })}/>
						</div>
						<div className="FormField">
							<label>Description</label>
							<input id="card-description" className="FormText"
							       onChange={event => this.setState({ description: event.target.value })}/>
						</div>
						<div className="FormField">
							<label>Attack</label>
							<input id="card-attack" className="FormText"
							       onChange={event => this.setState({ attack: event.target.value })}/>
						</div>
						<div className="FormField">
							<label>Health</label>
							<input id="card-health" className="FormText"
							       onChange={event => this.setState({ health: event.target.value })}/>
						</div>
						<div className="FormField">
							<label>Movement</label>
							<input id="card-movement" className="FormText"
							       onChange={event => this.setState({ movement: event.target.value })}/>
						</div>
						<div className="FormField">
							<button id="download" onClick={
								(e) => {
									e.preventDefault();
									html2canvas(this.cardRef.current)
										.then((canvas) => {
											console.log('MENTÉS', this.cardRef.current);
											const newImage = canvas.toDataURL('image/png');
											return saveAs(newImage, `${this.state.name}.png`);
										}).catch(err => {
										console.log('err: ', err);
									});
								}
							}>
								Save
							</button>
						</div>
					</form>
				</div>
				<div className="card-container" ref={this.cardRef}>
					<div id="card">
						<div className="image" id="card-image" style={{
							backgroundImage: `url(${this.state.image})`,
							backgroundSize: "cover",
							backgroundPosition: "center center"
						}}>
						</div>
						<div className="icon">
							<div>
								{this.state.cost}
							</div>
						</div>
						<div className="name">
							<div>
								{this.state.name}
							</div>
						</div>
						<div className="icon">
							<div>
								{this.state.type}
							</div>
						</div>
						<div className="rarity">O</div>
						<div className="description">
							<div>
								{this.state.description}
							</div>
						</div>
						<div className="attack">
							<div>
								{this.state.attack}
							</div>
						</div>
						<div className="movement">
							<div>
								{this.state.movement}
							</div>
						</div>
						<div className="health">
							<div>
								{this.state.health}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};
};

export default Editor;
