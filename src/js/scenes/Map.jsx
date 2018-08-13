// @flow
import React from 'react'
import { Button } from '../components/Button.jsx'
import { Icon } from '../components/Icon.jsx'
import { MapSVG } from '../components/MapSVG.jsx'

type Country = {id: string, title: string, d: string}

type State = {
  mapView: {transform: string},
  countryNameDisplay: {display: string},
  countryId: string,
}

type Props = {
  clickMap: (countryId: string) => void,
  countries: Array<Country>,
}

class Map extends React.Component<Props,State> {
  state = {
    mapView: { transform: 'scale(1) translateY(0px)' },
    countryNameDisplay: { display: 'none' },
    countryId: '',
  }

  handleClickCloser = () => {
    this.setState({
      mapView: { transform: `scale(2) translateY(-100px)` },
    })
  }

  handleClickFurther = () => {
    this.setState({
      mapView: { transform: 'scale(1) translateY(0px)' },
    })
  }

  handleMouseEnter = (id: string) => {
    this.setState({
      countryNameDisplay: { display: 'block' },
      countryId: id,
    })
  }

  handleMouseOut = () => {
    this.setState({
      countryNameDisplay: { display: 'none' },
      countryId: '',
    })
  }

  handleClickInPath = (countryId: string) => {
    this.props.clickMap(countryId)
  }
  // prepareSVGPathList = (): Array<>     co zwraca?
  prepareSVGPathList = (): Array<React$Element<any>> => {
    const list = this.props.countries.map(elem => {
      return <path
        key={elem.id}
        id={elem.id}
        title={elem.title}
        className="land"
        onClick={() => this.handleClickInPath(elem.id)}
        onMouseEnter={() => this.handleMouseEnter(elem.id)}
        onMouseOut={this.handleMouseOut}
        d={elem.d}/>
    })
    return list
  }

  prepareCountryTitle = (): string => {
    const country = this.props.countries.filter(elem => this.state.countryId === elem.id)
    let title = ''
    title = country.length > 0 ? country[0].title : ''
    return title
  }

  render() {
    const {mapView, countryNameDisplay} = this.state

    const titleClass = this.prepareCountryTitle() !== '' ? 'isHovered' : ''

    return (
      <section className="map">
        <figure className="map-container">
          <h2 className="map-title visuallyhidden">World map</h2>
          <div
            className={`country-name ${titleClass}`}
            style={countryNameDisplay}
          >
            {this.prepareCountryTitle()}
          </div>
          <MapSVG
            mapView={mapView}
            svgPathList={this.prepareSVGPathList()}
          />
          <Button
            btnClass="btn-map btn-further"
            isHidden={true}
            handleClick={this.handleClickFurther}
          >
            <Icon sign="minus" />
          </Button>
          <Button
            btnClass="btn-map btn-closer"
            isHidden={true}
            handleClick={this.handleClickCloser}
          >
            <Icon sign="plus" />
          </Button>
        </figure>
      </section>
    )
  }
}

export { Map }

