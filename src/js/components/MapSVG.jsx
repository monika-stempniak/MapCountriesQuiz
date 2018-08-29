// @flow
import * as React from 'react'
import { MapInteractionCSS } from 'react-map-interaction'
import Icon from './Icon'

type Props = {
  svgPathList: Array<React$Element<any>>,
}

class MapSVG extends React.Component<Props> {
  componentDidMount() {
    const svgMap = this.map
    const svgParent = svgMap && svgMap.parentElement
    svgParent && svgParent.classList.add("map-svg-wrapper")
  }

  map: ?Element

  render() {
    const { svgPathList } = this.props
    const btnPlus = <Icon sign="plus" />
    const btnMinus = <Icon sign="minus" />
    return (
      <MapInteractionCSS
        showControls
        plusBtnContents={btnPlus}
        minusBtnContents={btnMinus}
        btnClass="btn-map"
        controlsClass="map-buttons"
        minScale={1}
        maxScale={10}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="map-svg"
          viewBox="0 0 1009.12 665.24"
          ref={(node) => { this.map = node }}
        >
          <g>
            {svgPathList}
          </g>
        </svg>
      </MapInteractionCSS>
    )
  }
}

export default MapSVG
