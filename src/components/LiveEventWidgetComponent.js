import React from "react"
import { Helmet } from 'react-helmet'

import envVariables from '../utils/envVariables';

// these two libraries are client-side only
//import LiveEventWidget from 'live-event-widget/dist';
//import 'live-event-widget/dist/index.css';
import LiveEventWidget from 'test-module-gatsby-compat';
import 'test-module-gatsby-compat/index.css';

const LiveEventWidgetComponent = class extends React.Component {

  render() {

    const widgetProps = {
      //apiBaseUrl: envVariables.SUMMIT_API_BASE_URL,
      //marketingApiBaseUrl: envVariables.MARKETING_API_BASE_URL,
      //summitId: parseInt(envVariables.SUMMIT_ID),
      apiBaseUrl: 'https://api.fnvirtual.app',
      marketingApiBaseUrl: 'https://marketing-api.fnvirtual.app',
      summitId: 12,
      title: "",
      featuredRoomId: 21
    };

    return (
      <>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/awesome-bootstrap-checkbox/1.0.2/awesome-bootstrap-checkbox.min.css" />
        </Helmet>
        <div>
          <LiveEventWidget {...widgetProps} {...this.props} />
        </div>
      </>
    )
  }
}

export default LiveEventWidgetComponent