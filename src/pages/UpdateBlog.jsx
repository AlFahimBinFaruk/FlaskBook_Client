import React, { useState, useEffect } from 'react';
import {
    MDBInput,
    MDBFile,
    MDBBtn,
    MDBTextArea,
    MDBIcon
} from 'mdb-react-ui-kit';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useGetBlogDetailsQuery, useUpdateBlogMutation } from '../services/blog_api';
import UploadFile from '../components/UploadFile';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// Define validation schema using Yup
const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    thumbnail_url: Yup.string().required('Blog image is required'),
});

export default function UpdateBlog() {
    const { blog_id } = useParams();
    const [updateBlog] = useUpdateBlogMutation();
    const [currentImageUrl, setCurrentImageUrl] = useState('');

    // Fetching blog details
    const { data: details, isLoading, error } = useGetBlogDetailsQuery(blog_id);

    useEffect(() => {
        if (details) {
            setCurrentImageUrl(details.thumbnail_url);
        }
    }, [details]);

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await updateBlog({ ...values, id: blog_id }).unwrap();
            toast.success('Blog updated successfully');
            
            resetForm();
        } catch (err) {
            toast.error(err.data?.msg || 'Failed to update blog');
        }
    };

    if (isLoading) return <>Loading...</>;
    if (error) return <>Error fetching blog details</>;

    return (
        <div className="mt-14">
            <h6 className='text-center mb-3'>Update Blog</h6>
            <Formik
                initialValues={{
                    title: details?.title || '',
                    thumbnail_url: details?.thumbnail_url || '',
                    description: details?.description || '',
                }}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <Field
                            as={MDBInput}
                            name="title"
                            type="text"
                            label="Title"
                            className="mb-4"
                        />
                        <ErrorMessage name="title" component="div" className="text-danger" />

                        {currentImageUrl ? (
                            <div className="my-3 d-flex justify-content-around align-items-center">
                                <img
                                    src={currentImageUrl}
                                    className='w-50'
                                    alt='Thumbnail'
                                />
                                <MDBIcon
                                    far
                                    icon="trash-alt"
                                    color="danger"
                                    onClick={() => {
                                        setCurrentImageUrl('');
                                        setFieldValue('thumbnail_url', '');
                                    }}
                                />
                            </div>
                        ) : (
                            <UploadFile name="thumbnail_url" />
                        )}

                        <Field
                            as={MDBTextArea}
                            name="description"
                            rows={4}
                            label="Post description"
                            className="mb-4"
                        />
                        <ErrorMessage name="description" component="div" className="text-danger" />

                        <MDBBtn color='success' type='submit' className='mb-4' block>
                            Update
                        </MDBBtn>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
