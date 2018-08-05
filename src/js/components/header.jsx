import React from 'react'

function Header(props) {
  return (
    <header className={`${props.section}-header`}>
      <h1 className="header-title">{props.children}</h1>
    </header>
  )
}

export { Header }
