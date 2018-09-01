// @flow
import React from "react";

type Props = {
  ordinalNumber: number,
  country: string,
  code: string,
  capital: string,
  flag: string,
  userAnswer: boolean
};

const Scores = (props: Props) => {
  const { ordinalNumber, country, code, capital, flag, userAnswer } = props;

  return (
    <tr>
      <td>{ordinalNumber}</td>
      <td>{code}</td>
      <td>{country}</td>
      <td>{capital}</td>
      <td>
        <img src={flag} alt={`${country}'s flag`} width="70" />
      </td>
      <td>{userAnswer}</td>
    </tr>
  );
};

export default Scores;
