import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import { useGetAllBlogListQuery } from "../services/blog_api";
import { useState } from "react";
import { Link } from 'react-router-dom';
import formatDate from '../helpers/formatDate';

export default function Home() {

    const [currentPage, setCurrentPage] = useState(1);
    const { data: details, isLoading, error } = useGetAllBlogListQuery({ page: currentPage });

    if (isLoading) {
        return <>Loading...</>
    }


    if (error) {
        return <>Error fetching blog</>
    }

    console.log("blogs ", details);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    return (
        <div>
            {details.blogs && details.blogs.length > 0 ? <>
                {details.blogs.map((data, ind) => (
                    <MDBCard className='shadow-5 my-5'>
                        <div className="d-flex justify-content-between">
                            <div className="profile d-flex align-items-center m-2">
                                <MDBIcon fas icon="user-circle" size="2x" />
                                <div className='ms-2'>
                                    <p className='small my-0'>{data.user_first_name} {data?.user_last_name}</p>
                                    <p className='custom-small my-0'>{formatDate(data.created_at)}</p>
                                </div>
                            </div>
                           
                        </div>

                        <MDBCardImage src={data?.thumbnail_url} position='top' alt='...' />

                        <MDBCardBody>
                            <p>{data.title}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                {/* <div className="d-flex">
                                    <MDBIcon fas icon="thumbs-up" color="primary" className="me-2" />
                                    <MDBIcon fas icon="thumbs-down" color="danger" />
                                </div> */}
                                <Link to={`/blog-details/${data._id}`}>
                                    <MDBBtn outline color="primary" size="sm">Show More</MDBBtn>
                                </Link>
                            </div>
                        </MDBCardBody>








                    </MDBCard>
                ))}
            </> : <p>No Blogs to show</p>}


            <div className="pagination-controls mt-5 mx-auto">
                <MDBBtn
                    disabled={currentPage <= 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    size="sm"
                >
                    Previous
                </MDBBtn>
                <span className="mx-3">Page {currentPage}</span>
                <MDBBtn
                    disabled={details.totalPages <= currentPage}
                    onClick={() => handlePageChange(currentPage + 1)}
                    size="sm"
                >
                    Next
                </MDBBtn>
            </div>


        </div>
    )
}