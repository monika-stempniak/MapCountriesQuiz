// @flow
import * as React from 'react'

type Props = {
  section: string,
  children: React.Node
}

function Header(props: Props) {
  const {section, children} = props
  return (
    <header className={`${section}-header`}>
      <h1 className="header-title">
        {children}
      </h1>
    </header>
  )
}

export default Header
