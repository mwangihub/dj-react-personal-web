import React, { Component } from 'react';
import Api from '../Api';
import { connect } from 'react-redux';
import * as myAccountActions from '../redux/myAccount/myAccountActions'
import { Messages, dropDownStyle } from './sub/SubComponents'

class AccountMessages extends Component {
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
        const { email } = this.props;
        const { allMessages, loadedNumber } = this.state;
        return (
            <section className="about profile__dashboard mt-5">
                <div className="container">
                    <div className="section-title">
                        <h2 className='fs-5'>Hello welcome back <span className="text-success">{email}</span></h2>
                        <p className="lead mb-4">For admin account use in the url <small className="ms-5">myaccount/administrator/</small></p>
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
export default connect(mapStateToProps, mapDispatchToProps)(AccountMessages);