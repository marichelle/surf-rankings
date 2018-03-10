import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
	state = {
		screen: 'list', // list || create
		contacts: []
	}

	componentDidMount() {
		ContactsAPI.getAll().then((contacts) => {
			this.setState({ contacts })
		})
	}

	createContact = (contact) => {
		// Create contact in "database"
		ContactsAPI.create(contact).then((contact) => {
			this.setState((state) => ({
				contacts: state.contacts.concat([contact])
			}))
		})
	}

	removeContact = (contact) => {
		// Parenthesize the body of function to return an object literal expression
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
		this.setState((state) => ({
			contacts: state.contacts.filter((c) => c.id !== contact.id)
		}))

		// Remove contact from "database"
		ContactsAPI.remove(contact)
	}

	// <Route path="/create" component={CreateContact} />
	render() {
		return (
			<div className="app">
				<Route path="/" exact render={() => (
					<ListContacts
						contacts={this.state.contacts}
						onDelete={this.removeContact} />
				)} />

				<Route path="/create" render={({ history }) => (
					<CreateContact onCreate={(contact) => {
						this.createContact(contact)
						history.push('/')
					}} />
				)} />
			</div>
		);
	}
}

export default App;
