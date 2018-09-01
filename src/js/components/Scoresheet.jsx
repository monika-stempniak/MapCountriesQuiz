// @flow
import * as React from "react";

type Props = {
  userName: string,
  children: React.Node,
};

const Scoresheet = (props: Props) => {
  const { userName, children } = props;

  return (
    <table className="scoresheet">
      <caption className="scoresheet__title">
        User: <span className="scoresheet__user">{userName}</span>
      </caption>
      <thead className="scoresheet__head">
        <tr>
          <th>No.</th>
          <th>Code</th>
          <th>Country</th>
          <th>Capital</th>
          <th>Flag</th>
          <th>Answer</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Scoresheet;
