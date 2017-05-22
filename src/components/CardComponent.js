import React, {Component, PropTypes} from 'react';
import {Card, CardMedia, CardTitle} from 'react-toolbox/lib/card';
import Button from 'react-toolbox/lib/button';
import CopyToClipboard from 'react-copy-to-clipboard';
import Tooltip from 'react-toolbox/lib/tooltip';

const TooltipButton = Tooltip(Button);

class CardComponent extends Component {
    _colorTitle() {
        return (
            <div>
                <span>{`El color es el ${this.props.nameColor} (${this.props.hexColor})`}</span>
            </div>
        );
    }

    render() {
        return (
            <Card>
                <CardTitle title={this._colorTitle()}/>
                <CardMedia color={`#${this.props.hexColor}`} aspectRatio='wide'>
                    <CopyToClipboard
                        text={this.props.hexColor}
                        onCopy={() => console.log('copiado! ' + this.props.hexColor)}>
                        <TooltipButton
                            icon="description"
                            floating
                            mini
                            style={{
                            position: 'absolute',
                            right: '10px',
                            bottom: '10px'
                        }}
                            tooltip="Click para copiar hexadecimal"/>
                    </CopyToClipboard>
                </CardMedia>
            </Card>
        );
    }
}

CardComponent.propTypes = {
    hexColor: PropTypes.string
};

export default CardComponent;