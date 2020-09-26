import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import ScheduleLiteComponent from "../components/ScheduleLiteComponent";

import { PHASES } from '../utils/phasesUtils'

import SummitObject from '../content/summit.json'

const MySchedulePage = ({summit_phase, isLoggedUser, loggedUser}) => {

  let { summit } = SummitObject;

  let scheduleProps = {}
  if (isLoggedUser && summit_phase !== PHASES.BEFORE) {
    scheduleProps = { ...scheduleProps,
      onEventClick: (ev) => navigate(`/a/event/${ev.id}`),
    }
  }

  return (
    <Layout marketing={true}>
      <div className="container">
        <h1>My Schedule</h1>
        <hr/>
        <ScheduleLiteComponent
          {...scheduleProps}
          accessToken={loggedUser.accessToken}
          yourSchedule={true}
          landscape={true}
          showNav={true}
          showFilters={true}
          showAllEvents={true}
          eventCount={100}
          showDetails={true}
        />
      </div>
    </Layout>
  )
}

MySchedulePage.propTypes = {
  summit_phase: PropTypes.number,
  isLoggedUser: PropTypes.bool,
  loggedUser: PropTypes.object,
}

const mapStateToProps = ({ clockState, loggedUserState }) => ({
  summit_phase: clockState.summit_phase,
  isLoggedUser: loggedUserState.isLoggedUser,
  loggedUser: loggedUserState,
});

export default connect(
  mapStateToProps, {}
)(MySchedulePage);
