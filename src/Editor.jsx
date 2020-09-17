import React from 'react';
import './Editor.css';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import axios from 'axios';

class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			cost: '',
			description: '',
			type: '',
			image: '',
			image_data: '',
			attack: '',
			health: '',
			movement: ''
		};
		this.cardRef = React.createRef();
	}

	getImage(input) {
		this.setState({ image: input })

		if (input !== undefined && input.length > 10) { // @TODO: URL CHECK
			const res = axios
				.get(input, { responseType: 'arraybuffer' })
				.then(response => Buffer.from(response.data, 'binary').toString('base64') )
				.then(data => this.setState({ image_data: data }))
				.catch(err => {
					console.log('err: ', err)
			})
		}
	}

	render() {
		const image_data = `data:image/png;base64, ${this.state.image_data}`;

		return (
			<div className="container">
				<div className="fields-container">
					<form>
						<div className="FormFieldTopLeft">
						<div className="rowContainer">
							<label className="labelTop">Name</label></div>
							<div className="rowContainer">
							<label className="labelTop">Cost</label></div>
							<div className="rowContainer">
							<label className="labelTop">Type</label></div>
							<div className="rowContainer">
							<label className="labelTop">Image URL</label></div>
							<div className="rowContainer">
							<label className="labelTop">Attack</label></div>
							<div className="rowContainer">
							<label className="labelTop">Health</label></div>
							<div className="rowContainer">
							<label className="labelTop">Movement</label></div>
							<div className="rowContainer">
							<label className="labelTop">Description</label></div>
						</div>
					 	<div className="FormFieldTopRight">
							<div className="rowContainer">
							<input id="card-name" className="FormText"
									 	onChange={event => this.setState({ name: event.target.value })}/></div>
							<div className="rowContainer">
							<input id="card-cost" className="FormText"
							     	onChange={event => this.setState({ cost: event.target.value })}/></div>
											<div className="rowContainer">
			 				<input id="card-type" className="FormText"
			 						 	onChange={event => this.setState({ type: event.target.value })}/></div>
											<div className="rowContainer">
			 				<input id="card-name" className="FormText"
			 							onChange={event => this.getImage(event.target.value)}/></div>
											<div className="rowContainer">
			 				<input id="card-cost" className="FormText"
			 							onChange={event => this.setState({ attack: event.target.value })}/></div>
											<div className="rowContainer">
			 			 	<input id="card-type" className="FormText"
			 			 				onChange={event => this.setState({ health: event.target.value })}/></div>
											<div className="rowContainer">
			 			 	<input id="card-type" className="FormText"
			 			 				onChange={event => this.setState({ movement: event.target.value })}/></div>
							<textarea id="card-description" className="formTextfield"
										onChange={event => this.setState({ description: event.target.value })}/>
							<div style={{
							  height: "40px",
							  display: "flex",
							  alignItems: "center",
							float: "right"}}>
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
						</div>
					</form>
				</div>
				<div className="card-container" ref={this.cardRef}>
					<div id="card">
						<img className="card-image" src={image_data} />
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
