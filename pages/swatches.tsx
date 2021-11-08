import axios from "axios";
import React, { useEffect } from "react";

interface InputDetails {
  content: string;
}

const swatches = ({ content }: InputDetails) => {
  return <div className='swatch-grid'></div>;
};

export default swatches;

export async function getStaticProps() {
  return {
    props: {
      content: "title",
    }, // will be passed to the page component as props
  };
}
