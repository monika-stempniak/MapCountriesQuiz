// @flow
import React from "react";

type Props = {
  sign: string
};

function Icon(props: Props) {
  const { sign } = props;
  return <i className={`fas fa-${sign}`} />;
}

export default Icon;
