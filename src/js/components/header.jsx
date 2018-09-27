// @flow
import * as React from "react";
import Logo from "./Logo";

type Props = {
  children: React.Node,
};

const Header = (props: Props) => (
  <section className="header__wrapper">
    <div className="container">
      <header className="header">
        <h1 className="header__title">
          <Logo />
          Map Countries Quiz
        </h1>
      </header>
      {props.children}
    </div>
  </section>
);

export default Header;
