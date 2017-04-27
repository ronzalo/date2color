import React, {Component} from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import {Layout, Panel} from 'react-toolbox';
import DatePicker from 'react-toolbox/lib/date_picker';
import ReactGA from 'react-ga';
import moment from 'moment';

import Share from './components/Share';
import CardComponent from './components/CardComponent';

class App extends Component {

  constructor() {
    super();

    this.state = {
      date: null,
      hexColor: null,
      value: null
    }

    this._handleChange = this
      ._handleChange
      .bind(this);
  }

  _panelStyle() {
    return ({align: 'center'});
  }

  _formattedDate() {
    return moment(this.state.date).format('D/MM/YYYY');
  }

  _pictureUrl() {
    return `https://dummyimage.com/600x400/${this.state.hexColor}/${this.state.hexColor}.png`
  }

  _shareTitle() {
    return `Según esta fecha ${this._formattedDate()}, mi color es el #${this.state.hexColor} \n ¡¡Encuentra el tuyo!!`
  }

  _colorTitle() {
    return (
      <div>
        <span>{`Tu color es: #${this.state.hexColor}`}</span>
      </div>
    );
  }

  _handleChange(date) {
    let timestamp = date.getTime();
    let hexTimestamp = parseInt(timestamp, 10).toString(16);
    let hexColor = hexTimestamp.substr(-6);

    ReactGA.event({category: 'User', action: 'Obtain color'});

    this.setState({date: date, hexColor: hexColor});
  }

  _renderCard() {
    if (this.state.hexColor) {
      return (
        <div>
          <CardComponent hexColor={this.state.hexColor}/>
          <Share
            title={this._shareTitle()}
            url="http://date2color.herokuapp.com"
            picture={this._pictureUrl()}/>
        </div>
      )
    }
  }

  componentDidMount() {
    ReactGA.initialize('UA-62979020-3');
  }

  render() {
    return (
      <Layout>
        <Panel style={this._panelStyle()}>
          <AppBar title='Color Hex From Date'/>
          <DatePicker
            label='Date'
            onChange={this
            ._handleChange
            .bind(event)}
            value={this.state.date}
            sundayFirstDayOfWeek={false}/> {this._renderCard()}
        </Panel>
      </Layout>
    );
  }
}

export default App;
