// @flow
import * as React from 'react'

type Props = {
  isMapViewCloser: string,
  svgPathList: Array<React$Element<any>>,
}

function MapSVG(props: Props) {
  const { isMapViewCloser, svgPathList } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`map-svg ${isMapViewCloser}`}
      viewBox="0 0 1009.12 665.24"
    >
      <g>
        {svgPathList}
      </g>
    </svg>
  )
}

export default MapSVG
