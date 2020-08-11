import React from "react"
import DocumentsComponent from '../components/DocumentsComponent'

import { epochToMomentTimeZone } from "openstack-uicore-foundation/lib/methods";

const TalkComponent = class extends React.Component {

  constructor(props) {
    super(props);

    this.formatEventDate = this.formatEventDate.bind(this);
    this.formatSpeakers = this.formatSpeakers.bind(this);
    this.formatEventLocation = this.formatEventLocation.bind(this);
    this.getMaterials = this.getMaterials.bind(this);
  }

  formatEventDate(start_date, end_date, timezone) {
    if (!start_date || !end_date || !timezone) return;
    const date = epochToMomentTimeZone(start_date, timezone).format('dddd, MMMM D')
    const startTime = epochToMomentTimeZone(start_date, timezone).format('h:mm a');
    const endTime = epochToMomentTimeZone(end_date, timezone).format('h:mm a');
    const dateNice = `${date}, ${startTime} - ${endTime}`;
    return dateNice;
  }

  formatSpeakers(speakers) {
    let formatedSpeakers = '';
    if (speakers && speakers.length > 0) {
      speakers.forEach((speaker, index) => {
        formatedSpeakers += `${speaker.first_name} ${speaker.last_name}`;
        if (speakers.length > index + 2) formatedSpeakers += ', ';
        if (speakers.length - 2 === index) formatedSpeakers += ' & ';
      });
    }
    return formatedSpeakers;
  }

  formatEventLocation(event) {
    let formattedLocation = `
      ${event?.location?.venue?.name ? `- ${event.location.venue.name}` : ''} 
      ${event?.location?.floor?.name ? ` - ${event.location.floor.name}` : ''}
      ${event?.location?.name ? ` - ${event.location.name}` : ''}`;
    return event === {} ? 'Select an event from the schedule' : formattedLocation;
  }

  getMaterials(event) {
    let materials = [];
    if (event.links?.length > 0) materials = [...materials, ...event.links]
    if (event.videos?.length > 0) materials = [...materials, ...event.videos]
    if (event.slides?.length > 0) materials = [...materials, ...event.slides]
    return materials;
  }


  render() {

    const { event: { class_name, start_date, end_date, speakers, title, description }, event, summit: { time_zone_id } } = this.props;

    return (
      <div className={`columns talk ${class_name !== 'Presentation' ? 'p0 pr-3 pb-3' : 'px-5 py-5'}`}>
        {class_name !== 'Presentation' ?
          <div className="talk__break">
            <div>
              <b>{title}</b>
              <br />
              Next session will start soon...
            </div>
          </div>
          :
          <React.Fragment>
            <div className="column is-three-quarters">
              <span className="talk__date">{this.formatEventDate(start_date, end_date, time_zone_id)} {this.formatEventLocation(event)}</span>
              <h1>
                <b>{title}</b>
              </h1>
              <div className="talk__speaker">
                {speakers && speakers?.length === 0 ?
                  null
                  :
                  speakers?.length < 6 ?
                    <div className="columns is-multiline">
                      {speakers.map((s, index) => {
                        return (
                          <div className="column is-one-third talk__speaker-container" key={index}>
                            <img src={s.pic} alt={`${s.first_name} ${s.last_name}`} />
                            <div>
                              {`${s.first_name} ${s.last_name}`}
                              <br />
                              <b>{s.title}</b>
                            </div>
                          </div>
                        )
                      })
                      }
                    </div>
                    :
                    <span className="talk__speaker--name">
                      {this.formatSpeakers(speakers)}
                    </span>
                }
                <br /><br />
                <div className="talk__description" dangerouslySetInnerHTML={{ __html: description }} />
              </div>
              <br />
            </div>
            <div className="column is-one-quarters">
              <DocumentsComponent materials={this.getMaterials(event)} />
            </div>
          </React.Fragment>
        }
      </div>
    )
  }
}

export default TalkComponent