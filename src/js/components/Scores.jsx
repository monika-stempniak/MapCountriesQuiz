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
    else if (userAnswer === false) a = "wrong";
    else a = "good";
    return a;
  };

  const classAnswer = () => {
    let classEnding;
    switch (answer()) {
      case "good":
        classEnding = "good";
        break;
      case "wrong":
        classEnding = "wrong";
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
