import React, { useEffect, useContext, useState } from "react";
import classes from './Home.module.css';
// import { UserContext } from "../../providers/UserProvider";
import { useHistory } from 'react-router-dom';
// import { logOut } from "../../services/firebase";
import { UserContext } from "../../providers/UserProvider";
import Navbar from '../../components/Navbar/Navbar';
import img1 from './img1.jpg';
import img2 from './img2.jpg';
import img3 from './img3.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

export default function Home() {
  const user = useContext(UserContext);
  const history = useHistory();

  const toDashboard = () => {
    if (user) {
      history.push('/dashboard');
    } else {
      history.push('/sign-in');
    }
  }

  return (
    <div>
      <Navbar/>
      <div>
        <div className={ classes.midContainer }>
          <p className={ classes.text }>To always keep you in touch.</p>
          <button className={ classes.btn } onClick={ toDashboard }>Find the perfect time now!</button>
        </div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ height: '88vh', objectFit: 'cover' }}
            src={ img1 }
            alt="First slide"
          />
          {/* <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ height: '88vh', objectFit: 'cover' }}
            src={ img2 }
            alt="Third slide"
          />

          {/* <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ height: '88vh', objectFit: 'cover' }}
            src={ img3 }
            alt="Third slide"
          />

          {/* <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
      </Carousel>
      </div>
    </div>    
  )
}