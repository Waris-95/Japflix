import Navbar from "../../navbar/Navbar";
import Featured from "../../featured/Featured";
import "./home.scss"
import List from "../../list/List";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Featured/>
      <List/>
      <List/>
      <List/>
      <List/>
    </div>
  );
};

export default Home;