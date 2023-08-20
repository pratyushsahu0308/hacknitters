import React from 'react';
import {Image} from 'react-bootstrap'

const ResumeViewer = (props) => {
  return (<>
  <Image src={props.src} alt='resume not available' style={{width:"100%",height:"auto",borderRadius:"2%"}}/>
  </>
)
}

export default ResumeViewer