import React from 'react'
import {Container,Row,Col} from "react-bootstrap"
import {HiOutlineMail} from 'react-icons/hi'
import {FaInstagram, FaLinkedin, FaGithub} from 'react-icons/fa'
const Footer = () => {
    const currentYear = new Date().getFullYear()

  return (
    <footer style={{fontFamily: "Raleway",textAlign:"center",fontWeight:400,color:"#0f172a",fontSize:"18px",boxShadow: "0px 0px 30px rgba(127, 137, 161, 0.25)", zIndex:100, background: "#fff",padding: "40px 0 10px 0"}}>

        <><Container>

                    <Row>
                        <div className="col-md-4 col-lg-4 col-12">
                            <h2 style={{fontWeight:700}}>RESUME BOOK</h2>
                            <p><HiOutlineMail /> enquiry@pratyushsahu.com</p>
                        </div>
                        <div className="col-md-4 col-lg-4 col-12">
                            <h2 style={{fontWeight:700}}>Social</h2>
                            <p><a href="https://github.com/pratyushsahu0308"><FaGithub /></a>  <a href='https://www.linkedin.com/in/pratyushsahu0308/'><FaLinkedin /></a> <a href='https://www.instagram.com/pratyush__sahu/'><FaInstagram /></a></p>
                        </div>
                        <div className="col-md-4 col-lg-4 col-12">
                            <h2 style={{fontWeight:700}}>Contact</h2>
                            <p>Pratyush Sahu, CS-J 3rd Year, Medi-Caps University </p>
                        </div>
                    </Row>

    </Container>
        </>
        <Container>
            <Row>
                <Col className="text-center py-3" style={{fontWeight:600,fontSize:"23px"}}>
                    <p> ResumeBook &copy; {currentYear}</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer