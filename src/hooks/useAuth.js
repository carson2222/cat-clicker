import { useDispatch } from "react-redux";
import { loadNewData, updateEmail } from "../features/gameSlice";
import notify from "../toastify";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";
function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function singUp(e, email, password) {
    try {
      e.preventDefault();
      if (!email || !password) throw new Error("Data is missing");

      const { error } = await supabase.auth.signUp({ email, password });

      if (error) throw new Error(error);
      else {
        notify("success", "Account created", 500);
        dispatch(updateEmail(email));

        const { data, error } = await supabase.from("profiles").insert([{ email }]).select();
        if (error) throw new Error(error);
        dispatch(loadNewData(data[0]));
        navigate("/game");
      }
    } catch (error) {
      notify("error", error.message + "💥");
      console.error(error.message + "💥");
    }
  }
  async function logIn(e, email, password) {
    try {
      e.preventDefault();
      if (!email || !password) throw new Error("Data is missing");

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error);
      else {
        notify("success", "Logged in", 500);
        dispatch(updateEmail(email));
        const { data, error } = await supabase.from("profiles").select().eq("email", email);

        if (error) throw new Error(error);
        dispatch(loadNewData(data[0]));
        navigate("/game");
      }
    } catch (error) {
      notify("error", error.message + "💥");
      console.error(error.message + "💥");
    }
  }

  return { logIn, singUp };
}
export default useAuth;
