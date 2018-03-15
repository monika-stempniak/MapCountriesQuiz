import React from 'react';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapSvgStyle: {transform: `scale(1) translateY(0px)`},
      countryHover: {display: 'none'},
      countryId: ''
    }
  }

  handleClickCloser() {
    this.setState({
      mapSvgStyle: {transform: `scale(1.2) translateY(-50px)`}
    })
  }

  handleClickFurther() {
    this.setState({
      mapSvgStyle: {transform: `scale(1) translateY(0px)`}
    })
  }

  handleMouseEnter(id) {
    this.setState({
      countryHover: {display: 'block'},
      countryId: id,
    })
  }

  handleMouseOut() {
    this.setState({
      countryHover: {display: 'none'},
      countryId: ''
    })
  }

  handleClickInPath(idCountry) {
    this.props.clickMap(idCountry);
  }

  render() {

    const list = this.props.countries.map( elem => {
      return <path
      key={elem.id}
      id={elem.id}
      title={elem.title}
      className="land"
      onClick={e => this.handleClickInPath(elem.id)}
      onMouseEnter={(e) => this.handleMouseEnter(elem.id)}
      onMouseOut={() => this.handleMouseOut()}
      d={elem.d}/>;
    })

    let country = [];
    country = this.props.countries.filter( elem => {
      return this.state.countryId === elem.id
    })

    let title = "";
    if(country.length > 0 ) {
      title = country[0].title
    }

    return (
      <section className="map">
        <figure className="map-container">
          <button className="btn-map btn-further" aria-hidden="true" onClick={() => this.handleClickFurther()}><i className="fas fa-minus"></i></button>
          <button className="btn-map btn-closer" aria-hidden="true" onClick={() => this.handleClickCloser()}><i className="fas fa-plus"></i></button>
          <div className="country-name" style={this.state.countryHover}>{title}</div>
          <h2 className="map-title visuallyhidden">World map</h2>
          <svg xmlns="http://www.w3.org/2000/svg" className="map-svg" viewBox="0 0 1009.12 665.24" style={this.state.mapSvgStyle}>
            <g>
              {list}
            </g>
          </svg>
        </figure>
      </section>
    )
  }
}

export { Map };

