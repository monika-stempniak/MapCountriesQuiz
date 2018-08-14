// @flow
import React from 'react'
import Button from '../components/Button'
import Icon from '../components/Icon'
import MapSVG from '../components/MapSVG'

type Country = {id: string, title: string, d: string}

type State = {
  shouldMapViewComeCloser: boolean,
  countryId: string,
}

type Props = {
  clickMap: (countryId: string) => void,
  countries: Array<Country>,
}

class Map extends React.Component<Props,State> {
  state = {
    shouldMapViewComeCloser: false,
    countryId: '',
  }

  handleClickCloser = () => {
    this.setState({
      shouldMapViewComeCloser: true,
    })
  }

  handleClickFurther = () => {
    this.setState({
      shouldMapViewComeCloser: false,
    })
  }

  handleMouseEnter = (id: string) => {
    this.setState({
      countryId: id,
    })
  }

  handleMouseOut = () => {
    this.setState({
      countryId: '',
    })
  }

  handleBlur = () => {
    this.setState({
      countryId: '',
    })
  }

  handleClickInPath = (countryId: string) => {
    const { clickMap } = this.props
    clickMap(countryId)
  }

  prepareSVGPathList = (): Array<React$Element<any>> => {
    const { countries } = this.props
    const list = countries.map(elem => {
      return (
        <path
          key={elem.id}
          id={elem.id}
          title={elem.title}
          className="land"
          onClick={() => this.handleClickInPath(elem.id)}
          onMouseEnter={() => this.handleMouseEnter(elem.id)}
          onMouseOut={this.handleMouseOut}
          onBlur={this.handleBlur}
          d={elem.d}
        />
      )
    })
    return list
  }

  prepareCountryTitle = (): string => {
    const { countries } = this.props
    const { countryId } = this.state
    const country = countries.filter(elem => countryId === elem.id)
    let title = ''
    title = country.length > 0 ? country[0].title : ''
    return title
  }

  render() {
    const { shouldMapViewComeCloser } = this.state

    const titleClass = this.prepareCountryTitle() !== '' ? 'isHovered' : ''
    const isMapViewCloser = shouldMapViewComeCloser ? 'isCloser' : ''

    return (
      <section className="map">
        <figure className="map-container">
          <h2 className="map-title visuallyhidden">
            World map
          </h2>
          <div
            className={`country-name ${titleClass}`}
          >
            {this.prepareCountryTitle()}
          </div>
          <MapSVG
            isMapViewCloser={isMapViewCloser}
            svgPathList={this.prepareSVGPathList()}
          />
          <Button
            btnClass="btn-map btn-further"
            isHidden
            handleClick={this.handleClickFurther}
          >
            <Icon sign="minus" />
          </Button>
          <Button
            btnClass="btn-map btn-closer"
            isHidden
            handleClick={this.handleClickCloser}
          >
            <Icon sign="plus" />
          </Button>
        </figure>
      </section>
    )
  }
}

export default Map
