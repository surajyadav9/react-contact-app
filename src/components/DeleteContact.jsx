import { Link } from "react-router-dom"


const DeleteContact = (props) => {

    const { id } = props.location.state.contact

    const deleteHandler = (e) => {
        props.deleteContactId(id)
        props.history.push("/")
    }

    return (
        <div className="main">
            <h2>Do you really want to delete this contact ?</h2>
            <div className="center-div">
                <button className="ui button blue center" onClick={deleteHandler}>Yes</button> | 
                <Link to="/">
                    <button className="ui button blue center">No</button>
                </Link>   
            </div>
        </div>
    )
}

export default DeleteContact