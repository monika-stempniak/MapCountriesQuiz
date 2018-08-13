// @flow
import React from 'react'

type Props = {
  sign: string
}

function Icon(props: Props) {
  return <i className={`fas fa-${props.sign}`}/>
}

export { Icon }
