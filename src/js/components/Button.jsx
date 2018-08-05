import React from 'react'

const Button = (props) => {
  const {
    btnType = "button",
    btnClass,
    isHidden = false,
    handleClick,
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
