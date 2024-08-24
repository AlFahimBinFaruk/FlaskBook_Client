import React from 'react';
import {
    MDBInput,
    MDBCol,
    MDBBtn,
} from 'mdb-react-ui-kit';
import { useLoginUserMutation } from '../services/user_api';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// Define validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
});

export default function Login() {
    const [loginUser] = useLoginUserMutation();

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const res = await loginUser(values).unwrap();
            localStorage.setItem("token", res.access_token);
            toast.success('Login successful');
            resetForm();
            window.location.assign("/");
        } catch (err) {
            console.error(err);
            toast.error('Failed to login');
        }
    };

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <MDBCol size="12" md="8" lg="4">
                <h6 className='text-center mb-3'>Login</h6>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form>
                            <Field
                                as={MDBInput}
                                className='mb-4'
                                type='email'
                                id='form1Example1'
                                name='email'
                                label='Email address'
                                size='sm'
                            />
                            <ErrorMessage name='email' component='div' className='text-danger' />
                            
                            <Field
                                as={MDBInput}
                                className='mb-4'
                                type='password'
                                id='form1Example2'
                                name='password'
                                label='Password'
                                size='sm'
                            />
                            <ErrorMessage name='password' component='div' className='text-danger' />

                            <MDBBtn type='submit' className='mb-4' block size='sm'>
                                Login
                            </MDBBtn>
                        </Form>
                    )}
                </Formik>
            </MDBCol>
        </div>
    );
}
