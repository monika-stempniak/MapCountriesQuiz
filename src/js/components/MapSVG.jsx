// @flow
import * as React from 'react'

type Props = {
  mapView: {transform: string},
  svgPathList: Array<React$Element<any>>,
}

function MapSVG(props: Props) {
  const { mapView, svgPathList } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="map-svg"
      viewBox="0 0 1009.12 665.24"
      style={mapView}
    >
      <g>
        {svgPathList}
      </g>
    </svg>
  )
}

export default MapSVG
