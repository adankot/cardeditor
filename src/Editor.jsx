import React from 'react';
import './Editor.css';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import axios from 'axios';
import DraggableCore from "react-draggable";

const itemType = {
	"One Block": "oneBlock",
	"Two Long Block": "twoBlock",
	"Three Long Block": "threeBlock",
	"Four Long Block": "fourBlock",
	"Five Long Block": "fiveBlock",
	"Six Long Block": "sixBlock",
	"Seven Long Block": "sevenBlock",
	"Eight Long Block": "eightBlock",
	"Double Row Block": "doubleBlock"
}

const itemValue = {
	"Name": "name",
	"Cost": "cost",
	"Type": "type",
	"Attack": "attack",
	"Health": "health",
	"Movement": "movement",
	"Rarity": "rarity",
	"Description": "description"
}

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
			movement: '',
			rarity: '',
			typeSelectionText: "Type Selection",
			valueSelectionText: "Value Selection",
			itemsList: [],
			itemCounter: 0
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

	getDropdownTypeElement (type) {
		return <a onClick={(e) => {
			this.setState({ typeSelectionText: type })
		}}>
			{ type }
		</a>;
	}

	getDropdownValueElement (value) {
		return <a onClick={(e) => {
			this.setState({ valueSelectionText: value })
		}}>
			{ value }
		</a>;
	}

	getNewBlock (value, type, keyValue) {
		this.setState({ itemsList: [
			...this.state.itemsList,
			{ value,type,keyValue }
		]});
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
							<label className="labelTop">Rarity</label></div>
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
											<div className="rowContainer">
			 			 	<input id="card-type" className="FormText"
			 			 				onChange={event => this.setState({ rarity: event.target.value })}/></div>
							<textarea id="card-description" className="formTextfield"
										onChange={event => this.setState({ description: event.target.value })}/>
							<div style={{
							  height: "40px",
							  display: "flex",
							  alignItems: "center",
							float: "right"}}>
							<button id="download" className="dropdown-button" style={{ backgroundColor: "#e74c3c"}} onClick={
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

						<div className="dropdown" style={{ marginRight: "40px", marginTop: "20px" }}>
  						<button className="dropdown-button" style={{ pointerEvents: "none" }}> {this.state.typeSelectionText} </button>
  							<div className="dropdown-content">
									{ this.getDropdownTypeElement("One Block") }
									{ this.getDropdownTypeElement("Two Long Block") }
									{ this.getDropdownTypeElement("Three Long Block") }
									{ this.getDropdownTypeElement("Four Long Block") }
									{ this.getDropdownTypeElement("Five Long Block") }
									{ this.getDropdownTypeElement("Six Long Block") }
									{ this.getDropdownTypeElement("Eight Long Block") }
									{ this.getDropdownTypeElement("Seven Long Block") }
									{ this.getDropdownTypeElement("Double Row Block") }
  							</div>
						</div>

						<div className="dropdown">
  						<button className="dropdown-button" style={{ pointerEvents: "none" }}> {this.state.valueSelectionText} </button>
  							<div className="dropdown-content">
									{ this.getDropdownValueElement("Name") }
									{ this.getDropdownValueElement("Cost") }
									{ this.getDropdownValueElement("Type") }
									{ this.getDropdownValueElement("Attack") }
									{ this.getDropdownValueElement("Health") }
									{ this.getDropdownValueElement("Movement") }
									{ this.getDropdownValueElement("Rarity") }
									{ this.getDropdownValueElement("Description") }
  							</div>
						</div>

						<button className="dropdown-button" style={{ position: "relative", width: "80px", marginLeft: "40px", paddinTop: "20px"}} onClick={
							(e) => {
								e.preventDefault();
								this.setState({ itemCounter: this.state.itemCounter + 1 });
								{ this.getNewBlock( itemValue[this.state.valueSelectionText], this.state.typeSelectionText, "newItem_" + this.state.itemCounter ) }
							}
						}>
							Build
						</button>

					</form>
				</div>

				<div className="card-container" ref={this.cardRef}>
					<div id="card">
						<DraggableCore grid={ [50, 50]}>
						<div style={{height: "500px", width: "400px"}}>
							<img className="card-image" src={image_data} /></div>
						</DraggableCore>
						<div>
							{ this.state.itemsList
									.map(({value, type, keyValue}) =>
										<ItemSuper removeMe={() => {this.setState({itemsList: this.state.itemsList.filter(x => x.keyValue !== keyValue)})}}
										   type={ itemType[type]} value={this.state[value]} key={keyValue}/>
							)}
						</div>
					</div>
				</div>

				<div className="remove-container"/>

			</div>
		);
	};
};

class ItemSuper extends React.Component {
	constructor(props) {
		super(props);
		this.randomColor = Math.floor(Math.random()*16777215).toString(16);
	}

	onRelease = (e, position) => {
    const x = position.lastX;
		if (x > 400) {
			this.props.removeMe();
			return false;
		} else {
			return true;
		}
  };

	render() {
		 return (
			 <DraggableCore onStop={this.onRelease} grid={ [50, 50]}>
			 	<div>
					<div className={ this.props.type } style={{ background: "#" + this.randomColor }}>
						{ this.props.value }
					</div>
				</div>
			</DraggableCore>
		);
	}
}

export default Editor;
