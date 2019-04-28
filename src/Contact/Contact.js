import React from 'react'
import './Contact.css'
import axios from 'axios';

class Contact extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      contacts: [],
      currentPage: 1,
      countPerPage: 25,
      activeIndex: 1 
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event,index) {
    this.setState({
      currentPage: Number(event.target.id)
    });

    //Update Active Page Index
    this.setState({ activeIndex: index });
  }

  componentDidMount() {
    const auth = {
      headers: { "authToken": localStorage.getItem('authtoken') },
    }

   axios.get('https://internal-api-staging-lb.interact.io/v2/lists?', auth)
      .then(response => {
        const listId = response.data[0].id
        if (listId) {
          axios.get(`https://internal-api-staging-lb.interact.io/v2/lists/${listId}/contacts?limit=100`, auth)
            .then(responseContacts => {
              this.setState({ contacts: responseContacts.data.data })
              console.log(this.state.contacts);
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /* ----LOGOUT----- */
  logout = () => {
    console.log("logout");
    document.cookie = "authenticated= ";
    localStorage.setItem("authtoken", '')
    window.location.href = '/login'
  }

  render() {
    const { contacts,currentPage, countPerPage } = this.state;

    // Logic for displaying Per Page counts
    const indexOfLastCount = currentPage * countPerPage;
    const indexOfFirstCount = indexOfLastCount - countPerPage;
    const currentCounts = contacts.slice(indexOfFirstCount, indexOfLastCount);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(contacts.length / countPerPage); i++) {
      pageNumbers.push(i);
    }


    // Render Page Numbers
    const renderPageNumbers = pageNumbers.map(number => {
        const className = this.state.activeIndex === number ? 'active' : '';
        return (
          <li
            key={number}
            id={number}
            className={className}
            onClick={ (event) => this.handleClick(event,number)}>
            {number}
          </li>
        );
      });
    
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
                {currentCounts &&
                  currentCounts.map((contact, index) => (
                    <tr key={index}>
                      <td >{index+1}</td>
                      <td>{contact.contactType === "COMPANY" ? contact.companyName : contact.firstName+" "+contact.lastName}</td>
                      <td>{contact.phoneNumbers[0].number}</td>
                      <td>{contact.emails[0].email}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <ul id="page-numbers" className="float-right">
                {renderPageNumbers}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Contact;