import coverImage from "./assets/josefin-HtCgLIDy-2U-unsplash.jpeg";
const Header = () => {
  return (
    <div>
      <div
        style={{
            height: "10rem",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            display: "grid",
            placeItems: "center",
            backgroundImage: `url(${coverImage})`
        }}
      >
      <div style={{color: "white",textAlign: "center"}}>
        <h1>The Generics</h1>
      </div>
      </div>
    </div>
  );
};
export default Header;
