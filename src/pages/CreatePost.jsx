import React from 'react';
import {
    MDBInput,
    MDBFile,
    MDBBtn,
    MDBTextArea
} from 'mdb-react-ui-kit';

export default function CreatePost() {
    return (
        <div className="mt-14">
            <h6 className='text-center mb-3' >Create a new post</h6>
            <form>
                <MDBInput id='form4Example1' className='mb-4' label='Title' />
                <MDBFile label='Upload Thumbnail' id='customFile' className='mb-4' />
                <MDBTextArea className='mb-4' label="Post description" id="textAreaExample" rows="{4}" />


                <MDBBtn color='success' type='submit' className='mb-4' block>
                    Post
                </MDBBtn>
            </form>
        </div>
    );
}