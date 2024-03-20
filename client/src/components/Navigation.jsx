import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "1rem" }}
      >
        <Link to="/">Home</Link>
        <span style={{ margin: "0 0.5rem" }}>|</span>
        <Link to="/search">Search</Link>
        <span style={{ margin: "0 0.5rem" }}>|</span>
        <Link to="/help">Help</Link>
      </div>
    </>
  );
};

export default Navigation;
