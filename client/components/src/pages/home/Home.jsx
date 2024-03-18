import Navbar from "../../navbar/Navbar";
import Featured from "../../featured/Featured";
import "./home.scss";
import List from "../../list/List";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const url = `lists${type ? "?type=" + type : ""}${
          genre ? "&genre=" + genre : ""
        }`
        
        console.log(url); // Add this line to log the URL

        const res = await axios.get(url);
        console.log(res);
        // setLists(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      <List />
      <List />
      <List />
      <List />
    </div>
  );
};

export default Home;
