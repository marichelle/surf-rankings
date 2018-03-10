import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
	static propTypes = {
		contacts: PropTypes.array.isRequired,
		onDelete: PropTypes.func.isRequired
	}

	// Component State

	state = {
		query: ''
	}

	// Custom Methods

	clearQuery = () => {
		this.setState({
			query: ''
		})
	}

	updateQuery = (query) => {
		this.setState({
			query: query.trim()
		})
	}

	// Lifecycle Methods

	componentWillMount() {
		console.log('componentWillMount()')
	}

	componentDidMount() {
		console.log('componentDidMount()')
	}

	componentWillUnmount() {
		console.log('componentWillUnmount()')
	}

	componentWillReceiveProps() {
		console.log('componentWillReceiveProps()')
	}

	// Render Method

	render() {
		const { contacts, onDelete } = this.props
		const { query } = this.state

		let displayContacts

		if (query) {
			const match = new RegExp(escapeRegExp(query), 'i')

			displayContacts = contacts.filter((contact) => match.test(contact.name))
		} else {
			displayContacts = contacts
		}

		displayContacts.sort(sortBy('name'))

		// Logical Operator '&&' returns expr1 if it can be converted to false; otherwise, returns expr2.
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators

		return (
			<div className="list-contacts">
				<div className="list-contacts-top">
					<input className="search-contacts"
						placeholder="Search contacts"
						type="text"
						value={query}
						onChange={(event) => this.updateQuery(event.target.value)} />
					<Link className="add-contact"
						to="/create">
						Add Contact
					</Link>
				</div>

				{(displayContacts.length !== contacts.length) && (
					<div className="showing-contacts">
						<span>Now showing {displayContacts.length} of {contacts.length} total</span>
						<button onClick={() => this.clearQuery()}>Show all</button>
					</div>
				)}

				<ol className="contact-list">
					{displayContacts.map((contact) => (
						<li key={contact.id} className="contact-list-item">
							<div className="contact-avatar"
								style={{ backgroundImage: `url(${contact.avatarURL})` }} />

							<div className="contact-details">
								<p>#{contact.rank}</p>
								<p>{contact.name}</p>
								<p>{contact.origin}</p>
							</div>

							<button className="contact-remove"
								onClick={() => onDelete(contact)}>
								Remove
							</button>
						</li>
					))}
				</ol>
			</div>
		)
	}
}

export default ListContacts
