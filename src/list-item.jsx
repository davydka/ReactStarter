var React = require('react');
var Firebase = require('firebase');

var rootUrl = 'https://amber-torch-8478.firebaseio.com/';

module.exports = React.createClass({
	getInitialState: function(){
		return {
			text: this.props.item.text,
			done: this.props.item.done,
			textChanged: false

		}
	},

	componentWillMount: function(){
		this.fb = new Firebase(rootUrl + 'items/' + this.props.item.key);

	},

	render: function(){
		return <div className="input-group">
			<span className="input-group-addon">
				<input
					type="checkbox"
					checked={this.state.done}
					onChange={this.handleDoneChange}
					/>
			</span>
			<input
				type="text"
				className="form-control"
				disabled={this.state.done}
				value={this.state.text}
				onChange={this.handleTextOnChange}
				/>
			<span className="input-group-btn">
				{this.changesButtons()}
				<button
					className="btn btn-default"
					onClick={this.handleOnDeleteClick}
					>
					Delete
				</button>
			</span>
		</div>
	},

	handleDoneChange: function(event){
		var update = {
			done: event.target.checked
		};

		this.setState(update);
		this.fb.update(update)
	},

	handleOnDeleteClick: function(event){
		this.fb.remove();
	},

	handleTextOnChange: function(event){
		this.setState({
			text: event.target.value,
			textChanged: true
		});
	},

	handleUndoClick: function(){
		this.setState({
			text: this.props.item.text,
			textChanged: false
		})
	},

	handleSaveClick: function(){
		this.fb.update({
			text: this.state.text
		})

		this.setState({
			textChanged: false
		})
	},

	changesButtons: function(){
		if(!this.state.textChanged){
			return null;
		} else {
			return [
				<button
					className="btn btn-default"
					onClick={this.handleSaveClick}
					>Save</button>,
				<button
					className="btn btn-default"
					onClick={this.handleUndoClick}
					>Undo</button>
			]
		}
	}
})