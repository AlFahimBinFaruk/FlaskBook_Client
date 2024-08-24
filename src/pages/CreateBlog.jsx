import React from 'react';
import {
    MDBInput,
    MDBBtn,
    MDBTextArea
} from 'mdb-react-ui-kit';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useCreateNewBlogMutation } from '../services/blog_api';
import UploadFile from '../components/UploadFile';

// Define validation schema using Yup
const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    thumbnail_url: Yup.string().required('Blog image is required'), 
});

export default function CreateBlog() {
    const [createNewBlog] = useCreateNewBlogMutation();

    const handleSubmit = async (values, { resetForm }) => {
        try {
            console.log("Submitted values:", values);
            await createNewBlog({ ...values }).unwrap();
            toast.success('Blog created successfully');
            resetForm();
        } catch (err) {
            console.error(err);
            toast.error(err.data?.msg || 'Failed to create blog');
        }
    };

    return (
        <div className="mt-14">
            <h6 className='text-center mb-3'>Create a new blog</h6>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    thumbnail_url: '', // Make sure this is included
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        <Field
                            as={MDBInput}
                            name="title"
                            type="text"
                            label="Title"
                            className="mb-4"
                        />
                        <ErrorMessage name="title" component="div" className="text-danger" />

                        <UploadFile name="thumbnail_url" /> {/* Pass name prop if needed */}

                        <Field
                            as={MDBTextArea}
                            name="description"
                            rows={4}
                            label="Post description"
                            id="textAreaExample"
                            className="mb-4"
                        />
                        <ErrorMessage name="description" component="div" className="text-danger" />

                        <MDBBtn color='success' type='submit' className='mb-4' block>
                            Create
                        </MDBBtn>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
