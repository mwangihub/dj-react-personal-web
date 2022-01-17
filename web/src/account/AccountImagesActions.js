import React, { Component } from 'react'
import Api from '../Api';
import { connect } from 'react-redux';
import * as myAccountActions from '../redux/myAccount/myAccountActions'
import { ImageCard } from './sub/SubComponents'
class AccountImagesActions extends Component {

    componentDidMount() {
        this.props.accountDataRequest()
    }

    deleteProfileImage = id => {
        const token = localStorage.getItem('token');
        Api.sendDeleteProfileImageReuest(token, id)
            .then(r => {
                console.log(r);
                if (r.status === 200) {
                    this.props.accountDataRequest() 
                }
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                } else if (error.request) {
                    console.log(myAccountActions.empty_response);
                } else {
                    console.log(myAccountActions.empty_response);
                }
            });
    }
    render() {
        const { images } = this.props;
        let data = images ? images : null;
        return (
            <section id="images-gallery" className='images-gallery'>
                <div className="section-title">
                    <h2 className='fs-5'>Profile Images</h2>
                    <p className="lead mb-4">All profile images</p>
                </div>
                <div className="container">
                    <div className="album">
                        {
                            data && data.map((imageObj, index) => {
                                let properties = {
                                    info: imageObj,
                                    method: this.deleteProfileImage
                                }
                                return (
                                    <ImageCard key={imageObj.id} {...properties} />
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        )
    }
}
const mapStateToProps = state => {
    return {
        images: state.authentication.accountData[1]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        accountDataRequest: () => dispatch(myAccountActions.fetchAccountData()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountImagesActions);

