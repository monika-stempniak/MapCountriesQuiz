import React from 'react'

function MapSVG(props) {
  const { mapViewStyle, svgPathList } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="map-svg"
      viewBox="0 0 1009.12 665.24"
      style={mapViewStyle}
    >
      <g>
        {svgPathList}
      </g>
    </svg>
  )
}

export { MapSVG }
