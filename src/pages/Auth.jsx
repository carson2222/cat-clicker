import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import AuthContent from "../content/AuthContent";

function Auth() {
  return (
    <div className="container">
      <Header />
      <AuthContent />
      <Footer />
    </div>
  );
}
export default Auth;
