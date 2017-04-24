import React, { Component } from 'react';
import {AppBar, Panel, Layout, DatePicker} from 'react-toolbox';
import { Card, CardMedia, CardTitle } from 'react-toolbox/lib/card';

class App extends Component {

  constructor() {
    super();

    this.state = {
      date: null,
      hexColor: null
    }

    this._handleChange = this._handleChange.bind(this);
    this._cardStyle    = this._cardStyle.bind(this);
  }

  _cardStyle() {
    return {width: '350px'};
  }

  _panelStyle() {
    return ({
      align: 'center'
    });
  }

  _colorTitle() {
    return `Tu color es: #${this.state.hexColor}`;
  }

  _handleChange(date) {
    // console.log(date.getTime());
    let timestamp = date.getTime();
    let hexTimestamp = parseInt(timestamp, 10).toString(16);
    let hexColor = hexTimestamp.substr(-6);

    this.setState({
      date: date,
      hexColor: hexColor
    });
  }

  _renderCard() {
    if(this.state.hexColor) {
      return (
        <Card style={this._cardStyle()}>
          <CardTitle
            title={this._colorTitle()}
          />
          <CardMedia
            color={`#${this.state.hexColor}`}
            aspectRatio='wide'
          />
        </Card>
      )
    }
  }

  render() {
    return (
      <Layout>
        <Panel style={this._panelStyle()}>
          <AppBar title='Color Hex From Date' />
          <DatePicker
            label='Date'
            onChange={this._handleChange.bind(event)}
            value={this.state.date}
            sundayFirstDayOfWeek={false}
          />
          {this._renderCard()}
        </Panel>
      </Layout>
    );
  }
}

export default App;
