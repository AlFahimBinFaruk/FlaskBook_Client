import React from 'react';
import {
    MDBInput,
    MDBFile,
    MDBBtn,
    MDBTextArea
} from 'mdb-react-ui-kit';

export default function UpdatePost() {
    return (
        <div className="mt-14">
            <h6 className='text-center mb-3'>Update post</h6>
            <form>
                <MDBInput id='form4Example1' className='mb-4' label='Title' value={"something"} />


                <div className="prev-thumb d-flex flex-column align-items-start my-3">
                    <span className="small">Prev Thumbnail :</span>
                    <img src='https://mdbootstrap.com/img/new/slides/041.webp' className='img-fluid w-50 shadow-4 mb-2' alt='...' />
                </div>

                <MDBFile label='Upload New Thumbnail' id='customFile' className='mb-4' />
                <MDBTextArea className='mb-4' label="Post description" id="textAreaExample" rows="{4}" value={"something"} />


                <MDBBtn color='warning' type='submit' className='mb-4' block>
                    Update
                </MDBBtn>
            </form>
        </div>
    );
}