// @flow
import * as React from "react";
import Header from "../components/header";
import Form from "../components/Form";

const Home = () => {
  return (
    <div className="home">
      <Header>
        <h2 className="home__header">
          Please, enter your name to start the quiz
        </h2>
      </Header>
      <section className="home__content">
        <Form />
      </section>
    </div>
  );
};

export default Home;
