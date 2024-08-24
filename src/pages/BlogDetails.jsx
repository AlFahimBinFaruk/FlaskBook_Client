import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import { useDownVoteMutation, useGetBlogDetailsQuery, useUpVoteMutation } from "../services/blog_api";

import { Link, useParams } from 'react-router-dom';
import formatDate from '../helpers/formatDate';
import { useGetMyProfileQuery } from '../services/user_api';
import { useCreateNewCommentMutation, useDeleteCommentMutation ,useGetAllCommentListQuery } from '../services/comment_api';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// Validation schema for the comment form
const validationSchema = Yup.object({
    comment: Yup.string().required('Comment is required'),
});



export default function BlogDetails() {

    const params = useParams();

    const blog_id = params.blog_id;


    const { data: details, isLoading, error } = useGetBlogDetailsQuery(blog_id);
    const { data: userDetails, isLoading: isUserLoading, error: isUserError } = useGetMyProfileQuery();
    const { data: commentDetails, isLoading: isCommentLoading, error: isCommentError } = useGetAllCommentListQuery({ blog_id, page: 1 })

    const [createNewComment] = useCreateNewCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();
    const [upVote] = useUpVoteMutation();
    const [downVote] = useDownVoteMutation();

    //handle submit/create comment
    const handleSubmit = async (values, { resetForm }) => {
        try {
            await createNewComment({ blog_id, body: values.comment }).unwrap();
            toast.success("comment added.");
            resetForm();
        } catch (err) {
            toast.error(err.data?.msg || 'Failed to post comment');
        }
    };


    const handleDeleteComment = async (id) => {
        try {
            await deleteComment(id).unwrap();
            toast.success("comment deleted");
        } catch (err) {
            toast.error(err.data?.msg || 'Failed to post comment');
        }
    }

    const handleUpvote = async () => {
        try {
            await upVote(blog_id).unwrap();
            
            toast.success("upvoted");
        } catch (err) {
            toast.error(err.data?.msg || 'Failed to upvote');
        }
    }


    const handleDownvote = async () => {
        try {
            await downVote(blog_id).unwrap();
            
            toast.success("down voted");
        } catch (err) {
            toast.error(err.data?.msg || 'Failed to downvote');
        }
    }



    if (isLoading) {
        return <>Loading...</>
    }


    if (error) {
        return <>Error fetching blog</>
    }




    console.log("com ", details);




    return (
        <div>
            {details &&

                <MDBCard className='shadow-5 my-5'>
                    <div className="d-flex justify-content-between">
                        <div className="profile d-flex align-items-center m-2">
                            <MDBIcon fas icon="user-circle" size="2x" />
                            <div className='ms-2'>
                                <p className='small my-0'>{details.user_first_name} {details?.user_last_name}</p>
                                <p className='custom-small my-0'>{formatDate(details.created_at)}</p>
                            </div>
                        </div>



                        {details.user_id === userDetails?.user_id && <>
                            <div className="d-flex mt-2 me-2 align-items-center">
                                <Link to={`/update-blog/${details._id}`}>
                                    <MDBIcon far icon="edit" className='me-2' color='warning' />
                                </Link>
                                <MDBIcon fas icon="trash" color='danger' />
                            </div>
                        </>}



                    </div>

                    <MDBCardImage src={details?.thumbnail_url} position='top' alt='...' />

                    <MDBCardBody>
                        <p>{details.title}</p>
                        <p>{details.description}</p>


                        <div className="d-flex justify-content-between align-items-end mt-6">

                            <div className="d-flex align-items-center">
                                <MDBIcon fas icon="thumbs-up" color="primary" className="me-2" onClick={handleUpvote} role="button" />
                                <p className="mb-0 fs-6">{details.upvotes}</p>
                            </div>

                            <div className="d-flex align-items-center">
                                <MDBIcon fas icon="thumbs-down" color="danger" className="me-2" onClick={handleDownvote}
                                    role="button" />

                                <p className="mb-0 fs-6">{details.downvotes}</p>
                            </div>



                        </div>


                    </MDBCardBody>

                    <hr />



                    {/* post a comment */}
                    <div className="post-comment-form d-flex input-group w-auto m-2 mb-3">
                        <Formik
                            initialValues={{ comment: '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {() => (
                                <Form className="d-flex w-100">
                                    <Field
                                        as={MDBInput}
                                        name="comment"
                                        type="text"
                                        label="Write Comment"
                                        className="me-2"
                                    />
                                    <ErrorMessage name="comment" component="div" className="text-danger" />
                                    <MDBBtn type="submit">
                                        <MDBIcon fas icon="paper-plane" />
                                    </MDBBtn>
                                </Form>
                            )}
                        </Formik>

                    </div>


                    {/* comment list */}
                    <div className="comment-list w-50">
                        {commentDetails ? <>
                            {commentDetails.comments.map((data, ind) => (
                                <MDBCard className='shadow-5 ms-3 my-4' size='sm' >


                                    <div className="profile d-flex align-items-center justify-content-between m-2">
                                        <div className="d-flex">
                                            <MDBIcon fas icon="user-circle" size="2x" />
                                            <div className='ms-2'>
                                                <p className='small my-0 '>{data.user_first_name} {data?.user_last_name}</p>
                                                <p className='custom-small my-0'>{formatDate(data.created_at)}</p>
                                            </div>
                                        </div>


                                        {data.user_id == userDetails?.user_id &&
                                            <MDBIcon fas icon="trash" color='danger' onClick={() => handleDeleteComment(data._id)} role="button" />}

                                    </div>



                                    <MDBCardBody>{data.body}</MDBCardBody>


                                </MDBCard>
                            ))}
                        </> : <>Loading..</>}

                    </div>



                </MDBCard>
            }




        </div>
    )
}