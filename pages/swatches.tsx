import axios from "axios";
import React, { useEffect } from "react";

interface InputDetails {
  content: string;
}

const swatches = ({ content }: InputDetails) => {
  useEffect(() => {
    const fetchData = async () => {
      // var url = "http://colormind.io/api/";
      // var data = {
      //   model: "default",
      //   input: [[44, 43, 44], [90, 83, 82], "N", "N", "N"],
      // };

      // var http = new XMLHttpRequest();

      // http.onreadystatechange = function () {
      //   if (http.readyState == 4 && http.status == 200) {
      //     var palette = JSON.parse(http.responseText).result;
      //     console.log(palette);
      //   }
      // };

      // http.open("POST", url, true);
      // http.send(JSON.stringify(data));

      const url = "http://colormind.io/api/";
      const data = {
        model: "default",
      };
      const headers = {
        "Content-Type": "text/plain",
      };
      const colorPallete = await axios.post(url, data, { headers });
      console.log(colorPallete);
    };
    fetchData();
  }, []);

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
