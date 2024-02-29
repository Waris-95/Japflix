import { ArrowBackOutlined } from "@material-ui/icons";
import "./watch.scss";

export default function Watch() {
  return (
    <div className="watch">
      <div className="back">
        <ArrowBackOutlined />
        <span>Back to Home</span>
      </div>
      <div className="video-container">
          <iframe
            title="vimeo-player"
            src="https://player.vimeo.com/video/913893394?h=6290420dbf"
            width="640"
            height="360"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          Your browser does not support the video tag.
      </div>
    </div>
  );
}
