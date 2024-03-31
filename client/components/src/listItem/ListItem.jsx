import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

const cachedData = {};

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState(cachedData[item] || {});

  useEffect(() => {
    let isMounted = true;

    const getMovie = async () => {
      if (!item) return; // Don't fetch if item is falsy

      try {
        if (cachedData[item]) {
          setMovie(cachedData[item]);
          return;
        }

        const res = await axios.get(`http://localhost:5173/api/movies/find/${item}`, {
          headers: {
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTE2NjkwZWY2MTJhNjA5MzkwMGJkNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxMTAwNjMxMCwiZXhwIjoxNzExNDM4MzEwfQ.IvVupbx-UmSiDQdE6gMuxMSYIKo0Amf9fPsDJWYLAu0"
          },
        });

        if (isMounted) {
          setMovie(res.data);
          cachedData[item] = res.data; // Cache the fetched data
        }
      } catch (err) {
        console.log(err);
      }
    };

    getMovie();

    return () => {
      isMounted = false; // Cleanup function to prevent state updates on unmounted component
    };
  }, [item]);

  return (
    <Link to={{ pathname: "/watch", movie: movie }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie?.imgSm} alt="" />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
