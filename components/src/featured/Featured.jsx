import './featured.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import React from 'react'

export default function Featured({type}) {
    return (
      <div className='featured'>
        {type && (
          <div className='category'>
            <span>{type === "movie" ? "Movie" : "Series"}</span>
            <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            {/* <option value="crime">Crime</option> */}
            <option value="fantasy">Fantasy</option>
            {/* <option value="historical">Historical</option> */}
            <option value="horror">Horror</option>
            {/* <option value="romance">Romance</option> */}
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            {/* <option value="western">Western</option> */}
            <option value="animation">Animation</option>
            </select>
          </div>
        )}
        <img
          width="100%"
          src="https://wallpapercave.com/wp/wp8974133.jpg"
          alt=""
        />
      <div className="info">
        <img src="https://1000logos.net/wp-content/uploads/2022/06/Demon-Slayer-Logo.png"
         alt="" 
         />
         <span className="desc">
         "Demon Slayer: Kimetsu no Yaiba" is an anime following Tanjiro Kamado, who joins the Demon Slayer Corps to avenge his family and cure his demon-turned sister, Nezuko. 
         Packed with stunning animation and intense battles, it explores themes of loss, resilience, and the enduring bonds of family and friendship.
         </span>
         <div className="buttons">
            <button className="play">
                <PlayArrowIcon/>
                <span>Play</span>
            </button>
            <button className="more">
                <InfoOutlinedIcon/>
                <span>Info</span>
            </button>
         </div>
      </div>
    </div>
  )
}
