import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome to Blog Management System</h1>
        <p>Read blogs from different authors.</p>
      </div>
    </>
  );
}

export default Home;