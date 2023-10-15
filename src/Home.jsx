import { HomeContent } from "./HomeContent";
import { Header } from "./Header";
import { Footer } from "./Footer";
import cat_transparent from "./images/cat_transparent.png";

import potatoes from "./images/potatoes.jpg";

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
