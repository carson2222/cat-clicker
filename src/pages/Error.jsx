import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import ErrorContent from "../content/ErrorContent";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="container">
      <Header />
      <ErrorContent error={error} />
      <Footer />
    </div>
  );
};

export default Error;
