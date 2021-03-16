import React from "react"
import { Helmet } from 'react-helmet'

// these two libraries are client-side only
import LiveEventWidget from 'live-event-widget';
import 'live-event-widget/index.css';

import { getEnvVariable, SUMMIT_API_BASE_URL, MARKETING_API_BASE_URL, SUMMIT_ID } from '../utils/envVariables';
import HomeSettings from "../content/home-settings";

const LiveEventWidgetComponent = class extends React.Component {

  render() {

    const widgetProps = {
      apiBaseUrl: getEnvVariable(SUMMIT_API_BASE_URL),
      marketingApiBaseUrl: getEnvVariable(MARKETING_API_BASE_URL),
      summitId: parseInt(getEnvVariable(SUMMIT_ID)),
      title: "",
      defaultImage: HomeSettings.schedule_default_image
    };

    return (
      <React.Fragment>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/awesome-bootstrap-checkbox/1.0.2/awesome-bootstrap-checkbox.min.css" />
        </Helmet>
        <div>
          <LiveEventWidget {...widgetProps} {...this.props} />
        </div>
      </React.Fragment>
    )
  }
}

export default LiveEventWidgetComponent