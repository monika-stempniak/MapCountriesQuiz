// @flow
import React from 'react'
import MapSVG from '../components/MapSVG'

type Country = {id: string, title: string, d: string}

type State = {
  countryId: string,
}

type Props = {
  clickMap: (countryId: string) => void,
  countries: Array<Country>,
}

class Map extends React.Component<Props,State> {
  state = {
    countryId: '',
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
    const titleClass = this.prepareCountryTitle() !== '' ? 'isHovered' : ''

    return (
      <section className="map">
        <figure className="map-container">
          <figcaption className="map-title visuallyhidden">
            World map
          </figcaption>
          <div
            className={`country-name ${titleClass}`}
          >
            {this.prepareCountryTitle()}
          </div>
          <MapSVG
            svgPathList={this.prepareSVGPathList()}
          />
        </figure>
      </section>
    )
  }
}

export default Map
