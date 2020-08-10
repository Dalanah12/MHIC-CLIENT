import React from 'react'
import axios from 'axios'
import apiConfig from '../../apiConfig'
import { Link } from 'react-router-dom'

class JournalIndex extends React.Component {
  state = {
    journals: null
  }

  componentDidmount () {
    const { setJournals } = this.props
    axios.get(`${apiConfig}/journals`)
      .then(response => {
        this.setState({
          journals: response.data.journals
        })
        setJournals(response.data.journals)
      })
      .catch(console.error)
  }
  render () {
    let jsx
    if (this.state.journals === null) {
      jsx = <p>Loading...</p>
    } else if (this.state.journals.length === 0) {
      jsx = <p>No journals, please add a journal entry</p>
    } else {
      jsx = (
        <div>
          <ul>
            {this.state.journals.map(journal => {
              return (
                <li key={journal._id}>
                  <h3><Link to={`/journals/${journal._id}`}>{journal.title}</Link></h3>
                  <h4>{journal.content}</h4>
                </li>
              )
            })}
          </ul>
        </div>
      )
    }

    return (
      <div className="journal-index">
        <h2>Journals</h2>
        {jsx}
      </div>
    )
  }
}

export default JournalIndex
