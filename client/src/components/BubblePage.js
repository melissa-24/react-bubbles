import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from '../axiosWithAuth';
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then((res) => {
        console.log("ml: bubblepage: res: ", res.data);
        setColorList(res.data);
      })
      .catch((err) => {
        console.log("ml: bubblepage: error: ",err);
      });
  }, []);

  return (
    <div>
      <p>Testing</p>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </div>
  );
};

export default BubblePage;
