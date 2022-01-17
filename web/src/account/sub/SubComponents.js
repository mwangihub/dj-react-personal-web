import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Messages = ({ delMethod, message }) => {
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
export const dropDownStyle = 'position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate3d(-15px, 50px, 0px);';

export const ImageCard = ({ info: { profile_img, id }, method }) => {
    return (
        <div className="image">
            <img src={`${profile_img}`} className='rounded' alt='profile_img'/>
            <div className="actions">
                <div className="btn-group">
                    <button className="btn btn-sm btn-outline-success px-2">{id}</button>
                    <button className="btn btn-sm btn-outline-primary px-2 ms-2">Edit</button>
                    <button onClick={() => method(id)}
                        className="btn btn-sm btn-outline-danger px-2 ms-2">Delete</button>
                </div>
            </div>
        </div>
    )
}

export const NoProfileImageSvg = () => {
    return (
        <svg className="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#0e24d8"></rect><text x="30%" y="50%" fill="#fff" dy=".3em">Image preview</text></svg>
    )
}
export const ImagePreviewCard = ({ name, url }) => {
    return (
        <div className="card-body d-flex p-3" style={{
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "400px"
        }}>
            <img src={`${url}`} alt="" className="img-fluid rounded img-thumbnail" />
            <div>
                <span>{name}</span>
                <span></span>
            </div>
        </div>
    )
}