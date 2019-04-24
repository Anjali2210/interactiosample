import React from 'react'
import './Contact.css'
import axios from 'axios';


class Contact extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      contacts: []
    }
    console.log(localStorage.getItem('authtoken'));

  }

  componentDidMount() {

    // axios.get('https://internal-api-staging-lb.interact.io/v2/lists/3541/contacts', {
    //   "authToken": localStorage.getItem('authtoken').toString(),
    //   "listId": "3541",
    //   "orderBy": "listOrder",
    //   "limit": 25,
    //   "orderDirection": "DESC"
    // })
    const auth = {
      headers: { "authToken": localStorage.getItem('authtoken') }
    }
    axios.get('https://internal-api-staging-lb.interact.io/v2/lists', auth)
      .then(response => {
        const listId = response.data[0].id
        if (listId) {
          axios.get(`https://internal-api-staging-lb.interact.io/v2/lists/${listId}/contacts`, auth)
            .then(responseContacts => {
              this.setState({ contacts: responseContacts.data.data })
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }
      )
      .catch((err) => {
        console.log(err)
      })
  }
  logout = () => {
    console.log("logout");
    document.cookie = "authenticated= ";
    localStorage.setItem("authtoken", '')
    window.location.href = '/login'
  }
  render() {
    //const { username} = this.prop.state;
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <div className="d-flex justify-content-start align-items-center">
            <span className="navbar-brand">CRM</span>
          </div>
          <button onClick={this.logout} className="btn btn-outline-danger justify-content-end" type="button">Logout</button>
        </nav>
        <div className="container">
          <div className="contact-list">
            <table className="table mt-3">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {this.state.contacts &&
                  this.state.contacts.map((contact, index) => (
                    <tr key={index}>
                      <td >{index+1}</td>
                      <td>{contact.contactType === "COMPANY" ? contact.companyName : contact.firstName+" "+contact.lastName}</td>
                      <td>{contact.phoneNumbers[0].number}</td>
                      <td>{contact.emails[0].email}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
export default Contact