import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class OuterClick extends Component {
	constructor(props) {
		super(props);

		this.state = { isOpen: false };
		this.toggleContainer = React.createRef();

		this.onClickHandler = this.onClickHandler.bind(this);
		this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
	}

	componentDidMount() {
		window.addEventListener('click', this.onClickOutsideHandler);
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.onClickOutsideHandler);
	}

	onClickHandler() {
		this.setState(currentState => ({
			isOpen: !currentState.isOpen
		}));
	}

	onClickOutsideHandler(event) {
		if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
			this.setState({ isOpen: false });
		}
	}

	onBlurHandler() {
		this.timeOutId = setTimeout(() => {
			this.setState({
				isOpen: false
			});
		});
	}

	onFocusHandler() {
		clearTimeout(this.timeOutId);
	}

	render() {
		return (
			<div ref={this.toggleContainer}
					onBlur={this.onBlurHandler}
					onFocus={this.onFocusHandler}>
				<button onClick={this.onClickHandler}
					aria-haspopup="true"
					aria-expanded={this.state.isOpen}>
					Select an option
				</button>
				{this.state.isOpen && (
					<ul>
						<li>Option 1</li>
						<li>Option 2</li>
						<li>Option 3</li>
					</ul>
				)}
			</div>
		);
	}
}
