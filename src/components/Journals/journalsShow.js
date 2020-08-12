import React from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import apiUrl from '../../apiConfig'

class JournalShow extends React.Component {
  state = {
    journal: null,
    deleted: false
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
      .then(response => {
        this.setState({
          journal: response.data.journal
        })
      })
      .catch(console.error)
  }

  deleteJournal = () => {
    const id = this.props.match.params.id
    const { msgAlert, user } = this.props
    axios({
      method: 'DELETE',
      url: `${apiUrl}/journals/${id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(() => msgAlert({
        heading: 'Journal Deleted!',
        message: 'Message Success',
        variant: 'Success'
      }))
      .then(response => {
        this.setState({
          deleted: true
        })
      })
      .catch(() => msgAlert({
        heading: 'Journal could not be deleted, try again',
        message: 'Message Failure',
        variant: 'Failure'
      }))
      .catch(console.error)
  }

  render () {
    if (this.state.deleted === true) {
      return <Redirect to='/journals' />
    }
    let jsx
    if (this.state.journal === null) {
      jsx = <p>Loading...</p>
    } else {
      jsx = (
        <div>
          <section className="content">
            <h3>{this.state.journal.content}</h3>
            <button className="btn btn-danger" onClick={this.deleteJournal}>Delete Journal</button>
            <Link to={`/journals/${this.props.match.params.id}/update`}>
              <button className="btn btn-dark">Update</button>
            </Link>
          </section>
        </div>
      )
    }
    return (
      <div className="show">
        <h2>Selected Journal</h2>
        {jsx}
      </div>
    )
  }
}

export default JournalShow
