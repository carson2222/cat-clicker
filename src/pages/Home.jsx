import { HomeContent } from "../content/HomeContent";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useOutlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import supabase from "../supabaseClient";
import { updateSession } from "../features/gameSlice";

function Home() {
  const outlet = useOutlet();

  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(updateSession(session));
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(updateSession(session));
    });
  }, []);

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
