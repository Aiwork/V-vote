import React from 'react'
import './About.scss'
import Description from "./Description/Description";

export class Template extends React.Component {
  constructor() {
    super()
  }

  render() {

    return (
      <div>
        <div className="mainPreviewC">
          <h2>V O T E   M Y   C O I N  </h2>
          <h3>contribute to the development of technology </h3>
        </div>
        <Description/>
      </div>

    )
  }
}

export default Template