// @flow
import * as React from 'react'

type Props = {
  htmlType?: string,
  btnClass: string,
  isHidden?: boolean,
  handleClick?: (e: SyntheticMouseEvent<HTMLAnchorElement>) => void,
  children: React.Node,
  isDisable?: boolean,
}

const Button = (props: Props) => {

  const {
    htmlType,
    btnClass,
    isHidden,
    handleClick,
    children,
    isDisable,
  } = props

  return (
    <button
      type={htmlType}
      className={btnClass}
      aria-hidden={isHidden}
      onClick={handleClick}
      disabled={isDisable}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  htmlType: 'button',
  isHidden: false,
  handleClick: () => {},
  isDisable: false,
};

export default Button
