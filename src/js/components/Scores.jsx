// @flow
import React from "react";

type Props = {
  ordinalNumber: number,
  country: string,
  code: string,
  capital: string,
  flag: string,
  userAnswer: boolean | string,
};

const Scores = (props: Props) => {
  const { ordinalNumber, country, code, capital, flag, userAnswer } = props;
  const answer = () => {
    let a;
    if (userAnswer === "") a = "-";
    else if (userAnswer === false) a = "false";
    else a = "true";
    return a;
  };

  const classAnswer = () => {
    let classEnding;
    switch (answer()) {
      case "true":
        classEnding = "good";
        break;
      case "false":
        classEnding = "bad";
        break;
      default:
        classEnding = "no-answer";
    }
    return classEnding;
  };

  return (
    <tr>
      <td>{ordinalNumber}</td>
      <td>{code}</td>
      <td>{country}</td>
      <td>{capital}</td>
      <td>
        <img src={flag} alt={`${country}'s flag`} width="70" />
      </td>
      <td className={`scores--${classAnswer()}`}>{answer()}</td>
    </tr>
  );
};

export default Scores;
