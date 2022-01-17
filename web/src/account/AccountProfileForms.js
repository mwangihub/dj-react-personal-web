import React, { Component } from 'react'
import { ImagePreviewCard, NoProfileImageSvg } from './sub/SubComponents'
import Api from '../Api'
class AccountProfileForms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedFile: null,
            selectedFileInfo: null
        }
    }

    onFileUpload = e => {
        let data = new FormData();
        const token = localStorage.getItem('token');
        data.append('profile_img', this.state.selectedFile, this.state.selectedFile.name);
        Api.uploadProfileImage(token, data)
            .then(r => {
                console.log(r);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Another error occured when sending Message");
                }
            });
    };
    imageUploadPreview = e => {
        let selectedFileInfo = {
            name: e.target.files[0].name,
            url: URL.createObjectURL(e.target.files[0])
        }
        let selectedFile = e.target.files[0]
        this.setState({ selectedFile, selectedFileInfo })
    }
    render() {
        const { selectedFileInfo } = this.state;
        return (
            <section className='profile__dashboard'>
                <div className="section-title">
                    <h2 className='fs-5'>Update your profile</h2>
                    <p className="lead mb-4">For admin account use in the url <small className="ms-5">myaccount/administrator/</small></p>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title py-3">Upload image<span></span></h5>
                                    <div className="row">
                                        <label className="col-lg-2 col-form-label">Profile image</label>
                                        <div className="col-lg-10">
                                            <div className="input-group mb-3">
                                            {selectedFileInfo ?   <button className="btn btn-outline-primary" onClick={e => this.onFileUpload(e)}>Upload</button>: ''}
                                              
                                                <input type="file" className="form-control" multiple accept="image/*" onChange={e => this.imageUploadPreview(e)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 d-flex justify-content-center">
                            <div className="card" style={{ boxShadow: "0px 0 30px white" }}>
                                {selectedFileInfo ? <ImagePreviewCard {...selectedFileInfo} /> : <NoProfileImageSvg />}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
export default AccountProfileForms 