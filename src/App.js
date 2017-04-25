import React, { Component } from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import { Layout, Panel } from 'react-toolbox';
import DatePicker from 'react-toolbox/lib/date_picker';
import { Card, CardMedia, CardTitle } from 'react-toolbox/lib/card';
import ReactGA from 'react-ga';
import CopyToClipboard from 'react-copy-to-clipboard';
import Button from 'react-toolbox/lib/button';
import Tooltip from 'react-toolbox/lib/tooltip';

const TooltipButton = Tooltip(Button);

class App extends Component {

  constructor() {
    super();

    this.state = {
      date: null,
      hexColor: null,
      value: null
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

  _buttonStyle(){
    return ({
      position: 'absolute',
      right: '10px',
      bottom: '10px'
    })
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

    ReactGA.event({
      category: 'User',
      action: 'Obtain color'
    });

    this.setState({
      date: date,
      hexColor: hexColor
    });
  }

  _handleCopy() {
    
  }

  _renderCard() {
    if(this.state.hexColor) {
      return (
        <Card style={this._cardStyle()}>
          <CardTitle title={this._colorTitle()} />
          <CardMedia
            color={`#${this.state.hexColor}`}
            aspectRatio='wide'
          >
            <CopyToClipboard text={this.state.hexColor}
              onCopy={() => this._handleCopy()}>
              <TooltipButton icon="description" floating mini
                            style={this._buttonStyle()}
                            tooltipShowOnClick={true}
                            tooltip="Copiado!" />
            </CopyToClipboard>
          </CardMedia>
        </Card>
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
