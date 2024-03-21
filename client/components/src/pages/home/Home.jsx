import Navbar from "../../navbar/Navbar";
import Featured from "../../featured/Featured";
import "./home.scss";
import List from "../../list/List";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        let url = `http://localhost:5173/api/lists`;
        if (type || genre) {
          url += `?`;
          if (type) {
            url += `type=${type}`;
          }
          if (genre) {
            url += `${type ? "&" : ""}genre=${genre}`;
          }
        }

        const res = await axios.get(url, {
          headers: {
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTE2NjkwZWY2MTJhNjA5MzkwMGJkNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxMDk5NDY4MSwiZXhwIjoxNzExNDI2NjgxfQ.a3oIb-0zK4rasoubmvRssJvyImdw_53mmZ2jn74uXOQ"
          }
        });
        setLists(res.data);
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
    </div>
  );
};

export default Home;
