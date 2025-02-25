import React from "react"
import { navigate } from "gatsby"

const HeroComponent = ({ title, subtitle, event, redirectTo, options = {} }) => {

  if (redirectTo) {
    setTimeout(() => {
      navigate(`${redirectTo}`, options)
    }, 3000);
  }

  return (
    <section className={`hero is-fullheight ${event ? 'talk__break' : ''}`}>
      <div className="hero-body">
        <div className={`${event ? '' : 'container has-text-centered'}`}>
          <h1 className="title">{title}</h1>
          <h2 className="subtitle">{subtitle}</h2>
        </div>
      </div>
    </section>
  )
}

export default HeroComponent;