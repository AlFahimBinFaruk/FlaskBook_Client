import React from 'react';
import { MDBCard, MDBCardBody, MDBIcon } from 'mdb-react-ui-kit';

export default function CommentCard() {
    return (
        <MDBCard className='shadow-5 ms-3 my-4' size='sm' >


            <div className="profile d-flex align-items-center justify-content-between m-2">
                <div className="d-flex">
                    <MDBIcon fas icon="user-circle" size="2x" />
                    <div className='ms-2'>
                        <p className='small my-0 '>John Doe</p>
                        <p className='custom-small my-0'>13 June, 2012</p>
                    </div>
                </div>

                <div className="d-flex mt-2 me-2 align-items-center">

                    <MDBIcon fas icon="trash" color='danger' />
                </div>
            </div>



            <MDBCardBody>This is some random comment.</MDBCardBody>


        </MDBCard>
    );
}