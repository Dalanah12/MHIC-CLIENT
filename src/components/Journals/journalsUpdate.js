import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class JournalUpdate extends React.Component {
  state = {
    journal: {
      title: '',
      content: ''
    },
    updated: false
  }
  componentDidMount () {
    const id = this.props.match.params.id
    const { user } = this.props
    axios({
      method: 'GET',
      url: `${apiUrl}/journals/${id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(res => this.setState({ journal: res.data.journal }))
      .catch(console.error)
  }
  handleInputChange = (journal) => {
    // get the kickback key from the input name field
    const journalKey = journal.target.name
    // get the input value that the user typed in
    const value = journal.target.value
    // make a copy of the current state
    const journalCopy = Object.assign({}, this.state.journal)
    // update the copy with new user input
    journalCopy[journalKey] = value
    // update the state with out updated copy
    this.setState({ journal: journalCopy })
  }
  handleSubmit = (journal) => {
    journal.preventDefault()
    const id = this.props.match.params.id
    const { msgAlert, user } = this.props
    axios({
      method: 'PATCH',
      url: `${apiUrl}/journals/${id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: {
        journal: this.state.journal
      }
    })
      .then(response => {
        this.setState({
          updated: true,
          journal: response.data.journal
        })
      })
      .then(() => msgAlert({
        heading: 'Updated Successfully',
        message: messages.journalUpdateSuccess,
        variant: 'Success'
      }))
      .catch(console.error)
  }

  render () {
    const id = this.props.match.params.id

    if (this.state.updated) {
      return <Redirect to={`/journals/${id}`}/>
    }

    return (
      <div>
        <h1>Update Journal</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={this.state.journal.title}
              placeholder="Title"
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              type="text"
              name="content"
              value={this.state.journal.content}
              placeholder="What's Up?"
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Button variant="dark" type="submit">Update</Button>
        </Form>
      </div>
    )
  }
}

export default JournalUpdate
