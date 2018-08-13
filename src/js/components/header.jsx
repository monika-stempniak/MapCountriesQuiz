// @flow
import * as React from 'react'

type Props = {
  section: string,
  children: React.Node
}

function Header(props: Props) {
  return (
    <header className={`${props.section}-header`}>
      <h1 className="header-title">{props.children}</h1>
    </header>
  )
}

export { Header }
