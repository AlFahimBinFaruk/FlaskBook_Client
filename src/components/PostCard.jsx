import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import CommentCard from './CommentCard';
import { Link, useNavigate } from 'react-router-dom';

export default function PostCard() {




    return (
        <MDBCard className='shadow-5 my-5'>


            <div className="d-flex justify-content-between">
                <div className="profile d-flex align-items-center m-2">
                    <MDBIcon fas icon="user-circle" size="2x" />
                    <div className='ms-2'>
                        <p className='small my-0 '>John Doe</p>
                        <p className='custom-small my-0'>13 June, 2012</p>
                    </div>
                </div>
                <div className="d-flex mt-2 me-2">
                    <Link to='/update-post'>
                        <MDBIcon far icon="edit" className='me-2' color='warning'/>
                    </Link>
                    <MDBIcon fas icon="trash" color='danger' />
                </div>
            </div>

            <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/184.webp' position='top' alt='...' />

            <MDBCardBody>This is some radom blog description.</MDBCardBody>


            <hr />

            {/* comment list */}
            <div className="comment-list w-50">
                <CommentCard />
                <CommentCard />
                <CommentCard />
            </div>


            {/* post a comment */}
            <div className="post-comment-form d-flex input-group w-auto m-2 mb-3">
                <MDBInput label="Write Comment" id="form1" type="text" />
                <MDBBtn className='ms-1'><MDBIcon fas icon="paper-plane" /></MDBBtn>
            </div>
        </MDBCard>
    );
}