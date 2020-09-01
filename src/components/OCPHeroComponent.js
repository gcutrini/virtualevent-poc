import React from 'react'
import { connect } from "react-redux";
import { doLogin } from "openstack-uicore-foundation/lib/methods";
import URI from "urijs";

import { PHASES } from '../utils/phasesUtils';
import envVariables from '../utils/envVariables'

import HeroContent from '../content/marketing-site.json'
import styles from '../styles/lobby-hero.module.scss'

const getBackURL = () => {
  let { location } = this.props;
  let defaultLocation = envVariables.AUTHORIZED_DEFAULT_PATH ? envVariables.AUTHORIZED_DEFAULT_PATH : '/a/';
  let backUrl = location.state?.backUrl ? location.state.backUrl : defaultLocation;
  return URI.encode(backUrl);
}

const onClickLogin = () => {
  doLogin(getBackURL());
}

const OCPHeroComponent = ({ summit, summit_phase, isLoggedUser }) => (
  <section className={`${styles.ocpHero}`}>
    <div className={`${styles.ocpHeroColumns} columns`} style={{ backgroundImage: `url(${HeroContent.heroBanner.background})` }}>
      <div className={`${styles.ocpLeftColumn} column is-6 px-0 py-0`}>
        <div className={`${styles.ocpHeroContainer} hero-body`}>
          <div className="container">
            <h1 className={`${styles.title}`}>
              {HeroContent.heroBanner.title}
            </h1>
            <h2 className={`${styles.subtitle}`}>
              {HeroContent.heroBanner.subTitle}
            </h2>
            <span className={`${styles.date}`}>
              {HeroContent.heroBanner.date}
            </span>
            <div className={styles.heroButtons}>
              {summit_phase >= PHASES.DURING && isLoggedUser ?
                <a className={styles.link} href={`${envVariables.AUTHORIZED_DEFAULT_PATH ? envVariables.AUTHORIZED_DEFAULT_PATH : '/a/'}`} target="_blank" rel="noreferrer">
                  <button className={`${styles.button} button is-large`}>
                    <i className={`fa fa-2x fa-sign-in icon is-large`}></i>
                    <b>Enter</b>
                  </button>
                </a>
                :
                <React.Fragment>
                  {HeroContent.heroBanner.buttons.registerButton.display &&
                    <a className={styles.link} href={`${envVariables.REGISTRATION_BASE_URL}/a/${summit.slug}/`} target="_blank" rel="noreferrer">
                      <button className={`${styles.button} button is-large`}>
                        <i className={`fa fa-2x fa-edit icon is-large`}></i>
                        <b>{HeroContent.heroBanner.buttons.registerButton.text}</b>
                      </button>
                    </a>
                  }
                  {HeroContent.heroBanner.buttons.loginButton.display &&
                    <a className={styles.link}>
                      <button className={`${styles.button} button is-large`} onClick={() => onClickLogin()}>
                        <i className={`fa fa-2x fa-sign-in icon is-large`}></i>
                        <b>{HeroContent.heroBanner.buttons.loginButton.text}</b>
                      </button>
                    </a>
                  }
                </React.Fragment>
              }
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.ocpRightColumn} column is-6 px-0 py-0`}>
        <img src={HeroContent.heroBanner.images[0].image} />
      </div>
    </div>
  </section>

)

const mapStateToProps = ({ summitState }) => ({
  summit_phase: summitState.summit_phase,
})

export default connect(mapStateToProps, null)(OCPHeroComponent);