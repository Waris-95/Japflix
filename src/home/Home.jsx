import "./home.scss"
import Navbar from "../navbar/Navbar";
import Featured from "../featured/Featured";

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      
      <Featured/>
    </div>
  )
}

export default Home
