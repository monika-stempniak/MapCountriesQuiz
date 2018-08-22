// @flow
import * as React from 'react'

type Props = {
  htmlType?: string,
  btnClass: string,
  isHidden?: boolean,
  handleClick?: (e: SyntheticMouseEvent<HTMLAnchorElement>) => void,
  handleSubmit?: (e: SyntheticMouseEvent<HTMLButtonElement>) => void,
  children: React.Node,
}

const Button = (props: Props) => {

  const {
    htmlType,
    btnClass,
    isHidden,
    handleClick,
    handleSubmit,
    children,
  } = props

  return (
    <button
      type={htmlType}
      className={btnClass}
      aria-hidden={isHidden}
      onClick={handleClick}
      onSubmit={handleSubmit}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  htmlType: 'button',
  isHidden: false,
  handleClick: () => {},
  handleSubmit: () => {},
};

export default Button
