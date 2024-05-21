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

export default function Navbar() {






    return (
        <MDBNavbar light bgColor='light'>
            <MDBContainer fluid>
                <div className='d-flex align-items-center'>
                    <Link to="/">
                        <MDBNavbarBrand className='my-0'>Flaskbook</MDBNavbarBrand>
                    </Link>
                    <p className='mb-0 pb-0'>
                        <small>My Posts</small>
                    </p>
                    <Link to="/create-post">
                        <MDBBtn className='ms-2' size='sm' color='success'>Create New</MDBBtn>
                    </Link>
                </div>
                <MDBInputGroup tag="form" className='d-flex w-auto mb-3'>

                    <input className='form-control sm' placeholder="Search Posts" aria-label="Search" type='Search' />


                    <div className='p-1 ps-2 me-lg-0'>
                        <Link to='/profile'>
                            <MDBIcon fas icon="user-circle" size='lg' color='secondary'/>
                        </Link>
                    </div>

                </MDBInputGroup>

            </MDBContainer>
        </MDBNavbar>
    );
}