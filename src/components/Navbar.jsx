import {
    MDBContainer,
    MDBNavbar,
    MDBBtn,
    MDBInputGroup,
    MDBNavbarBrand,
    MDBNavbarLink,
    MDBIcon,
    MDBNavbarItem
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useGetMyProfileQuery } from '../services/user_api';

export default function Navbar() {



    const { data: details, isLoading, error } = useGetMyProfileQuery();

    const handleLogout=()=>{
        localStorage.removeItem("token");
        window.location.assign("/login");
    }

    if (isLoading) {
        return <>Loading..</>
    }



    // console.log("details ", details);

    return (
        <MDBNavbar light bgColor='light'>
            <MDBContainer fluid>
                <div className='d-flex align-items-center'>
                    <Link to="/">
                        <MDBNavbarBrand className='my-0'>Flaskbook</MDBNavbarBrand>
                    </Link>
                    {details && details.email ? <>
                        {/* <p className='mb-0 pb-0'>
                            <small>My Posts</small>
                        </p> */}
                        <Link to="/create-blog">
                            <MDBBtn className='ms-2' size='sm' color='success'>Create New</MDBBtn>
                        </Link>
                        <MDBBtn className='ms-2' size='sm' color='danger' onClick={handleLogout}>Logout</MDBBtn>

                    </> : <>

                        <Link to="/login" className='ms-3 me-2'>
                            <MDBBtn color='primary' size='sm'>Login</MDBBtn>
                        </Link>
                        <Link to="/register" className='me-2'>
                            <MDBBtn color='info' size='sm'>Register</MDBBtn>
                        </Link>
                    </>}
                </div>
                <MDBInputGroup tag="form" className='d-flex w-auto mb-3'>

                    <input className='form-control sm' placeholder="Search Posts" aria-label="Search" type='Search' />


                    <div className='p-1 ps-2 me-lg-0'>
                        <Link to='/profile'>
                            <MDBIcon fas icon="user-circle" size='lg' color='secondary' />
                        </Link>
                    </div>

                </MDBInputGroup>

            </MDBContainer>
        </MDBNavbar>
    );
}