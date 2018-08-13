// @flow
import * as React from 'react'

type Props = {
  btnType?: string,
  btnClass: string,
  isHidden?: boolean,
  handleClick: () => void,
  children: React.Node
}

const Button = (props: Props) => {
  const {
    btnType = 'button',
    btnClass,
    isHidden = false,
    handleClick
  } = props

  return <button
    type={btnType}
    className={btnClass}
    aria-hidden={isHidden}
    onClick={handleClick}
  >
    {props.children}
  </button>
}

export { Button }
