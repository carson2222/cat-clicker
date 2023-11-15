import { HomeContent } from "../content/HomeContent";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useOutlet } from "react-router-dom";

function Home() {
  const outlet = useOutlet();

  if (!outlet) {
    return (
      <>
        <div className="container">
          <Header />
          <HomeContent />
          <Footer />
        </div>
      </>
    );
  }
  return outlet;
}
export default Home;
