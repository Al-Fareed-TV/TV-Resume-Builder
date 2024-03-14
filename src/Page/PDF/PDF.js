import React from "react";
import MyPDF from "./MyPDF";
import { useSelector } from "react-redux";
const PDF = () => {
    const data = useSelector((state) => state)
  return (
    <div >
      <MyPDF data={data} />
    </div>
  );
};

export default PDF;
