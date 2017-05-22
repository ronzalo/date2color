import React, {Component} from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import {Layout, Panel } from 'react-toolbox';
import DatePicker from 'react-toolbox/lib/date_picker';
import ReactGA from 'react-ga';
import moment from 'moment';

import Share from './components/Share';
import CardComponent from './components/CardComponent';
import Jumbotron from './components/Jumbotron';

import "../vendor/color_classifier";
import {dataset} from "./data/dataset";

import './index.css';

class App extends Component {

  constructor() {
    super();

    const classifier = new window.ColorClassifier();
    classifier.learn(dataset);

    this.state = {
      date: null,
      hexColor: null,
      nameColor: null,
      classifier: classifier,
      index: 0
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
    return `Según la fecha ${this._formattedDate()}, mi color es el ${this.state.nameColor} (#${this.state.hexColor}) \n ¡¡Encuentra el tuyo!!`
  }

  _hexToName(hexColor) {
    let classifier = this.state.classifier;
    return classifier.classify(`#${hexColor}`);
  }

  _colorTitle() {
    return (
      <div>
        <span>{`Tu color es: ${this.state.nameColor}`}</span>
      </div>
    );
  }

  _handleChange(date) {
    let timestamp = date.getTime();
    let hexTimestamp = parseInt(timestamp, 10).toString(16);
    let hexColor = hexTimestamp.substr(-6);
    let nameColor = this._hexToName(hexColor);

    ReactGA.event({category: 'User', action: 'Obtain color'});

    this.setState({date: date, hexColor: hexColor, nameColor: nameColor});
  }

  _handleTabChange = (index) => {
    this.setState({index});
  };

  _renderCard() {
    if (this.state.hexColor) {
      return (
        <div>
          <CardComponent hexColor={this.state.hexColor} nameColor={this.state.nameColor}/>
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
          <Jumbotron>
            <DatePicker
              label='Seleccione una fecha'
              onChange={this
              ._handleChange
              .bind(event)}
              value={this.state.date}
              sundayFirstDayOfWeek={false}/>
            {this._renderCard()}
          </Jumbotron>
        </Panel>
      </Layout>
    );
  }
}

export default App;
