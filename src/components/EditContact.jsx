import React from "react"

class EditContact extends React.Component {

    constructor(props) {
        super(props)
        const { id, name, email } = props.location.state.contact
        this.state = {
            id,
            name,
            email
        }
    }

    update = (e) => {
        e.preventDefault();
        if (this.state.name === "" || this.state.email === "") {
            alert("All the fields are mandatory!");
            return;
        }

        // App.js
        this.props.updateContactHandler(this.state)

        // make both fileds empty after successfully adding a contact
        this.setState({ name: "", email: "" });

        // redirect to homepage(contact List) when a contact added
        this.props.history.push("/")
    }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value })
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value })
    }

    render() {
        return (
            <div className="ui main">
                <h2>Edit Contact</h2>
                <form className="ui form" onSubmit={this.update}>
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
                    <button className="ui button blue">Update</button>
                </form>
                <strong>The typed name is: </strong><span>{this.state.name}</span><br />
                <strong>The typed email is: </strong><span>{this.state.email}</span>
            </div>
        )
    }
}

export default EditContact