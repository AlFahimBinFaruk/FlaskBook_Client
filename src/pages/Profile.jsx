import React, { useState } from 'react';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBBtn
} from 'mdb-react-ui-kit';
import { useFormik, Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useChangePasswordMutation, useGetMyProfileQuery, useUpdateProfileMutation } from '../services/user_api';
import { toast } from 'react-toastify';

const profileValidationSchema = Yup.object({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
});

const passwordValidationSchema = Yup.object({
    new_password: Yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
    old_password: Yup.string().required('Old password is required'),
});


const Profile = () => {
    const { data: details, isLoading, error } = useGetMyProfileQuery();
    const [updateProfile] = useUpdateProfileMutation();
    const [changePassword] = useChangePasswordMutation();

    
    

    const handleProfileSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            await updateProfile(values).unwrap();
            toast.success('Profile updated successfully!');
            localStorage.removeItem("token");
            window.location.assign("/login");
        } catch (err) {
            console.error('Error updating profile:', err.data.msg);
            toast.error('Error updating profile.');
        } finally {
            setSubmitting(false);
        }
    };

    const handlePasswordSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            await changePassword(values).unwrap();
            toast.success('Password changed successfully!');
            localStorage.removeItem("token");
            window.location.assign("/login");

        } catch (err) {
            console.error('Error changing password:', err.data.msg);
            toast.error('Error changing password.');
        } finally {
            setSubmitting(false);
        }
    };

    if (isLoading) {
        return <>Loading...</>;
    }

    if (error) {
        return <>Profile fetching error.</>;
    }

    return (
        <div className="form-container">
            <h6 className='text-center mb-3'>Manage Profile</h6>

            {/* Profile Form */}
            <Formik
                initialValues={{
                    first_name: details?.first_name || '',
                    last_name: details?.last_name || '',
                    email: details?.email || '',
                }}
                validationSchema={profileValidationSchema}
                onSubmit={handleProfileSubmit}
                enableReinitialize
            >
                {({ isSubmitting }) => (
                    <Form>
                        <MDBRow className='mb-4'>
                            <MDBCol>
                                <Field
                                    as={MDBInput}
                                    name='first_name'
                                    label='First name'
                                    id='form3Example1'
                                    className='mb-4'
                                />
                                <ErrorMessage name='first_name' component='div' className='text-danger' />
                            </MDBCol>
                            <MDBCol>
                                <Field
                                    as={MDBInput}
                                    name='last_name'
                                    label='Last name'
                                    id='form3Example2'
                                    className='mb-4'
                                />
                                <ErrorMessage name='last_name' component='div' className='text-danger' />
                            </MDBCol>
                        </MDBRow>
                        <Field
                            as={MDBInput}
                            name='email'
                            type='email'
                            label='Email address'
                            id='form3Example3'
                            className='mb-4'
                        />
                        <ErrorMessage name='email' component='div' className='text-danger' />

                        <MDBInput className='mb-4' label="Admin" id="formControlDisabled" type="text" disabled />

                        <MDBBtn type='submit' className='mb-4' block color='warning' disabled={isSubmitting}>
                            Update
                        </MDBBtn>
                    </Form>
                )}
            </Formik>

            {/* Password Change Form */}
            <Formik
                initialValues={{
                    new_password: '',
                    old_password: '',
                }}
                validationSchema={passwordValidationSchema}
                onSubmit={handlePasswordSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field
                            as={MDBInput}
                            name='new_password'
                            type='password'
                            label='New password'
                            id='form3Example4'
                            className='mb-4'
                        />
                        <ErrorMessage name='new_password' component='div' className='text-danger' />

                        <Field
                            as={MDBInput}
                            name='old_password'
                            type='password'
                            label='Enter old password to update'
                            id='form3Example5'
                            className='mb-4'
                        />
                        <ErrorMessage name='old_password' component='div' className='text-danger' />

                        <MDBBtn type='submit' className='mb-4' block color='warning' disabled={isSubmitting}>
                            Change Password
                        </MDBBtn>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Profile;
