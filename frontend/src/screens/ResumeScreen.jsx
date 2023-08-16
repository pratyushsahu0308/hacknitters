import React from 'react'
import Pdf from "../pdf/chattisgarh.pdf";

const ResumeScreen = () => {

const onResumeClick = () => {
      window.open(Pdf);
    }
  return (
   <a onClick={onResumeClick}>
      Resume
   </a>
)

  
}

export default ResumeScreen