import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './profile/Header';
import Api from './Api';
import { connect } from 'react-redux';
import * as myAccountActions from './redux/myAccount/myAccountActions'
const dropDownStyle = 'position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate3d(-15px, 50px, 0px);';
const Messages = ({ delMethod, message }) => {
    const [isActive, setIsActive] = useState(false);
    return (
        <tbody id={`${message.id}`} className="border-bottom pb-3">
            <tr>
                <th scope="row"><Link to="/account/authenticated">#00{message.id}</Link></th>
                <td>{message.name}</td>
                <td onClick={() => setIsActive(!isActive)}
                    className="cursor_pointer"
                    style={{ maxWidth: "300px", color: 'blue' }}>
                    {message.email}
                </td>
                <td>{new Date(message.sent_at).toDateString()}</td>
                <td><span className="badge bg-success">Approved</span></td>
                <td>
                    <button className="btn btn-sm btn-outline-danger" onClick={e => delMethod(message.id)}>- Delete</button>
                    <button className="btn btn-sm btn-outline-warning ms-2">Action</button>
                </td>
            </tr>
            {isActive && <tr><td colSpan="5" className="m-1 rounded-2" style={{ background: "aliceblue" }}>{message.message}</td></tr>}
        </tbody>
    )
}
class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allMessages: [],
            loadedNumber: 3,

        }
    }

    loadMoreMessages = e => {
        let loadedNumber = parseInt(e.target.value);
        return (
            isNaN(loadedNumber) ? this.setState({ loadedNumber: 1 }) : this.setState({ loadedNumber })
        )
    }

    dropdownSortMenu = e => {
        let dropDown = e.target.parentElement.nextSibling;
        dropDown.classList.toggle("show");
        if (dropDown.classList.contains("show")) {
            e.target.style.color = "blue"
            dropDown.style = dropDownStyle
        } else {
            e.target.style.color = "#aab7cf"
            dropDown.style = ""
        }
    }
    componentDidMount() {
        this.props.onTryAutoSignUp();
        this.getAllMessages();
    }
    getAllMessages = () => {
        const token = localStorage.getItem('token');
        Api.getAllMessages(token)
            .then(res => {
                let allMessages = res.data;
                if (res.status === 200) {
                    this.setState({ allMessages })
                }
            })
            .catch(error => {
                if (error.res) {
                    console.log(error.res);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Another error occured when sending no input");
                }
            });
    }
    handleDeleMessage = msgID => {
        const token = localStorage.getItem('token');
        Api.sendDeleteMessageReuest(token, msgID)
            .then(res => {
                if (res.status === 200) {
                    this.getAllMessages()
                }
            })
            .catch(error => {
                if (error.res) {
                    console.log(error.res);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Another error occured when sending no input");
                }
            });
    }

    render() {
        const { email, isAuthenticated } = this.props;
        const { allMessages, loadedNumber } = this.state;
        return (
            isAuthenticated ? <React.Fragment>
                <Header profile={false} />
                <main id="main">
                    <section className="about profile__dashboard">
                        <div className="container">
                            <div className="section-title">
                                <h2 className='fs-5'>Hello welcome back <span className="text-success">{email}</span></h2>
                            </div>
                            <div className="col-12">
                                <div className="card recents">
                                    <div className="filter">
                                        <p className="icon"><i onClick={this.dropdownSortMenu} className="bi bi-three-dots" /></p>
                                        <ul className="shadow dropdown-menu">
                                            <li className="dropdown-header"><h6>Filter</h6></li>
                                            <li className="dropdown-item"> Today</li>
                                        </ul>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">Recent Messages <span>{/*| Today */}</span></h5>
                                        <div className="dataTable-wrapper dataTable-loading sortable searchable fixed-columns">
                                            <div className="dataTable-top">
                                                <div className="dataTable-dropdown ">
                                                    <div>
                                                        <input className="dataTable-input" type="text" value={loadedNumber} onChange={this.loadMoreMessages} />
                                                    </div>

                                                    <span>Messages per page </span>
                                                </div>
                                                <div className="dataTable-search">
                                                    {/* <input className="dataTable-input" placeholder="Search..." type="text" /> */}
                                                </div>
                                            </div>
                                            <div className="dataTable-container">
                                                <table className="table table-borderless datatable dataTable-table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Email</th>
                                                            <th scope="col">Time</th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    {
                                                        allMessages.slice(0, loadedNumber).map((message, index) => (
                                                            <Messages message={message} delMethod={this.handleDeleMessage} key={index} />
                                                        ))
                                                    }
                                                </table>
                                            </div>
                                            <div className="dataTable-bottom">
                                                <div className="dataTable-info">Showing 1 to {loadedNumber} of {allMessages.length} Messages</div>
                                                <nav className="dataTable-pagination">
                                                    <ul className="dataTable-pagination-list"></ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </React.Fragment> :
                <div className="px-4 py-5 my-5 text-center">
                        <h1 className="display-5">You are forbidden from this action</h1>
                        <div class="col-lg-6 mx-auto">
                            <p className="lead mb-4">
                                It could be that you were navigating the pages around so that you reached this URL. Or using you knowledge you somehow figured out how to reach this URL. Either way we humbly request you to respect this website as it is a personal space and leave this endpoint.
                            </p>
                            <p className="lead mb-4">
                            Otherwise it will be consindered as breach of privacy and related laws.
                            </p>
                        </div>
                </div>

        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.token !== null,
        error: state.authentication.error,
        loading: state.authentication.loading,
        email: state.authentication.email,
        reset_pwd: state.authentication.reset_pwd,
        info: state.authentication.info,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(myAccountActions.checkTokenState()),
        onLogOut: () => dispatch(myAccountActions.logout()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Account);