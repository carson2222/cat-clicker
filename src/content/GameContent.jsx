import Clicker from "../components/Clicker";
import Shop from "../components/Shop";
import classes from "./_game-content.module.scss";
import { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import supabase from "../supabaseClient";
import { updateSession } from "../features/gameSlice";

function GameContent() {
  const [formVisible, setFormVisible] = useState(true);
  const dispatch = useDispatch();
  // dispatch(updateSession(session));

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(updateSession(session));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(updateSession(session));
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <main className={classes.content}>
      {!formVisible || <AuthForm />}
      {formVisible || <Clicker />}
      {formVisible || <Shop />}
    </main>
  );
}
export default GameContent;
