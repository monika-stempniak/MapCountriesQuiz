// @flow
import * as React from 'react'

type Props = {
  btnClass: string,
  isHidden: boolean,
  handleClick: () => void,
  children: React.Node
}

const Button = (props: Props) => {

  const {
    btnClass,
    isHidden = false,
    handleClick,
    children,
  } = props

  return (
    <button
      type='button'
      className={btnClass}
      aria-hidden={isHidden}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export default Button
