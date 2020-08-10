import React from 'react'
import axios from 'axios'
import apiConfig from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'

class JournalCreate extends React.Component {
  state = {
    journal: {
      title: '',
      content: ''
    }
  }
  handleInputChange = (journal) => {
    // get the journal key from the input name field
    const journalKey = journal.target.name
    // get the input value that the user typed in
    const value = journal.target.value
    // make a copy of the current state
    const journalCopy = Object.assign({}, this.state.journal)
    // update the copy with the new user input
    journalCopy[journalKey] = value
    // update the state with our updated copy
    this.setState({ journal: journalCopy })
  }
  handleSubmit = (journal) => {
    journal.preventDefault()
    const { msgAlert, user } = this.props
    axios({
      method: 'POST',
      url: `${apiConfig}/journals`,
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: {
        journal: this.state.journal
      }

    })
      .then(() => msgAlert({
        heading: 'Journal Created',
        message: messages.journalsCreateSuccess,
        variant: 'Success'
      }))
      .then(res => {
        this.setState({
          journal: {
            title: '',
            content: ''
          }
        })
      })
      .catch(console.error)
  }
  render () {
    return (
      <div>
        <h1>Journal</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              name="title"
              value={this.state.journal.title}
              placeholder="Title"
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>New Journal Entry</Form.Label>
            <Form.Control
              required
              type="text"
              name="content"
              value={this.state.journal.content}
              placeholder="What's Up?"
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Button class="btn btn-primary" type="submit">ADD</Button>
        </Form>
      </div>
    )
  }
}

export default JournalCreate
