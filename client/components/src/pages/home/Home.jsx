import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../../navbar/Navbar";
import Featured from "../../featured/Featured";
import List from "../../list/List";

import "./home.scss";

const API_URL = '/api/lists';

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${API_URL}?${buildQueryParams(type, genre)}`;
        const { data } = await axios.get(url, {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTE2NjkwZWY2MTJhNjA5MzkwMGJkNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxMTkyMjIxNSwiZXhwIjoxNzEyMzU0MjE1fQ.72SXbf-hJLxZg9L2JuNQoQFfT28baIqOa6mnL8ASpuQ"
          }
        });
        

        if(data && data.length > 0) {
          setLists(data);
        } else {
          throw new Error('Invalid data from API');
        }
        
      } catch (error) {
        console.error(error);
        // Inform the user about the error
      }
    };

    fetchData();
  }, [type, genre]);

  const buildQueryParams = (type, genre) => {
    let query = '';

    if(type) {
      query += `type=${type}`;
    }

    if(genre) {
      query += query ? '&' : '';
      query += `genre=${genre}`;
    }

    return query;
  };

  return (
    <div className="home">
      <Navbar />
      <Featured  
        type={type}
        setGenre={setGenre} 
      />
  
      {lists.map((list, index) => (
        <List key={list._id || index} list={list} />
      ))}
    </div>
  );
}

export default Home;
