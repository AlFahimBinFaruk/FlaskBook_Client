import React from 'react';
import {
    MDBInput,
    MDBBtn
} from 'mdb-react-ui-kit';

export default function Login() {
    return (
        <div className="form-container">
            <h6 className='text-center mb-3'>Login</h6>
            <form>
                <MDBInput className='mb-4' type='email' id='form1Example1' label='Email address' />
                <MDBInput className='mb-4' type='password' id='form1Example2' label='Password' />

               

                <MDBBtn type='submit' block>
                    Login
                </MDBBtn>
            </form>
        </div>
    );
}