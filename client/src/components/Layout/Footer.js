import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram,faGithub, faLinkedin,faGoogle } from '@fortawesome/free-brands-svg-icons';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter className='text-center' color='white' bgColor='dark'>
      <MDBContainer className='p-4'>
        <section className='mb-4'>
          <h3>
              BOOK STORE
          </h3>
        </section>

        <section className=''>
          <MDBRow>
            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-white'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 4
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='/Policy.js' className='text-white'>
                    Policy
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    About Us
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 4
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-white'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 4
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-white'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 4
                  </a>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </section>
        <section className='mb-4'>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
          <FontAwesomeIcon icon={faFacebook} />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
          <FontAwesomeIcon icon={faTwitter} />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
          <FontAwesomeIcon icon={faInstagram} />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
          <FontAwesomeIcon icon={faGithub} />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
          <FontAwesomeIcon icon={faLinkedin} />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
          <FontAwesomeIcon icon={faGoogle} />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2020 Copyright:
        <a className='text-white' href='https://bookswagon.com/'>
          Bookswagon.com
        </a>
      </div>
    </MDBFooter>
  );
}