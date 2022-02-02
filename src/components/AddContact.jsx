import React from "react"

class AddContact extends React.Component {

  state = {
    name: "",
    email: "",
  }

  add = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("All the fields are mandatory!");
      return;
    }

    this.props.addContactHandler(this.state)
    this.setState({ name: "", email: "" });
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value})
  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }

  render() {
    return (
      <div className="ui main">
        <h2>Add Contact</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </div>
          <button className="ui button blue">Add</button>
        </form>
        <strong>The typed name is: </strong><span>{this.state.name}</span><br />
        <strong>The typed email is: </strong><span>{this.state.email}</span>
      </div>
    )
  }
}

export default AddContact