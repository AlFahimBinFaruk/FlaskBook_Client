import React from 'react';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit';

export default function Register() {
    return (
        <div className="form-container">
            <h6 className='text-center mb-3'>Register</h6>
            <form>
                <MDBRow className='mb-4'>
                    <MDBCol>
                        <MDBInput id='form3Example1' label='First name' />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput id='form3Example2' label='Last name' />
                    </MDBCol>
                </MDBRow>
                <MDBInput className='mb-4' type='email' id='form3Example3' label='Email address' />
                <MDBInput className='mb-4' type='password' id='form3Example4' label='Password' />
                <MDBInput className='mb-4' type='password' id='form3Example4' label='Confirm Password' />

                

                <MDBBtn type='submit' className='mb-4' block>
                    Register
                </MDBBtn>

                
            </form>
        </div>
    );
}