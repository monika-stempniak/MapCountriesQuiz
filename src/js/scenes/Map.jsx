import React from 'react'
import { Button } from '../components/Button.jsx'
import { Icon } from '../components/Icon.jsx'
import { MapSVG } from '../components/MapSVG.jsx'

class Map extends React.Component {
  state = {
    mapViewStyle: { transform: 'scale(1) translateY(0px)' },
    countryName: { display: 'none' },
    countryId: '',
  }

  handleClickCloser = () => {
    this.setState({
      mapViewStyle: { transform: `scale(2) translateY(-100px)` },
    })
  }

  handleClickFurther = () => {
    this.setState({
      mapViewStyle: { transform: 'scale(1) translateY(0px)' },
    })
  }

  handleMouseEnter = (id) => {
    this.setState({
      countryName: { display: 'block' },
      countryId: id,
    })
  }

  handleMouseOut = () => {
    this.setState({
      countryName: { display: 'none' },
      countryId: '',
    })
  }

  handleClickInPath = (countryId) => {
    this.props.clickMap(countryId)
  }

  prepareSVGPathList = () => {
    const list = this.props.countries.map( elem => {
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

  prepareCountryTitle = () => {
    const country = this.props.countries.filter(elem => this.state.countryId === elem.id)
    let title = ''
    title = country.length > 0 ? country[0].title : ''
    return title
  }

  render() {
    const {mapViewStyle, countryName} = this.state

    const titleClass = this.prepareCountryTitle() !== '' ? 'isHovered' : ''

    return (
      <section className="map">
        <figure className="map-container">
          <h2 className="map-title visuallyhidden">World map</h2>
          <div
            className={`country-name ${titleClass}`}
            style={countryName}
          >
            {this.prepareCountryTitle()}
          </div>
          <MapSVG
            mapViewStyle={mapViewStyle}
            svgPathList={this.prepareSVGPathList()}
          />
          <Button
            btnClass="btn-map btn-further"
            isHidden="true"
            handleClick={this.handleClickFurther}
          >
            <Icon sign="minus" />
          </Button>
          <Button
            btnClass="btn-map btn-closer"
            isHidden="true"
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

