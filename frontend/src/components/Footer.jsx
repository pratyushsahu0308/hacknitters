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
                        <div className="col-md-4 col-lg-12 col-12">
                            <h2 style={{fontWeight:700}}>WOOL HARBOR</h2>
                            <p><HiOutlineMail /> enquiry@woolharbor.com</p>
                            <h4 style={{fontWeight:400}}>Hack-Knitters, Medi-Caps University</h4>
                        </div>
                        <div className="col-md-4 col-lg-4 col-12">
                        <div className="col-md-4 col-lg-4 col-12">
                        </div>
                        </div>
                    </Row>

    </Container>
        <Container>
            <Row>
                <Col className="text-center py-3" style={{fontWeight:600,fontSize:"23px"}}>
                    <p> Hack-Knitters &copy; {currentYear}</p>
                </Col>
            </Row>
        </Container>
        </>
    </footer>
  )
}

export default Footer