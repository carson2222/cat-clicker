import { HomeContent } from "../content/HomeContent";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
// import cat_transparent from "./images/cat_transparent.png";
// import potatoes from "./images/potatoes.jpg";

function Home() {
  return (
    <div className="container">
      <Header />
      <HomeContent />
      <Footer />
    </div>
  );
}
export default Home;
