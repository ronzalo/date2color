import React, {Component, PropTypes} from 'react';
import {ShareButtons, generateShareIcon} from 'react-share';

const {FacebookShareButton, TwitterShareButton, WhatsappShareButton} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const WhatsappIcon = generateShareIcon('whatsapp');

class Share extends Component {
    render() {
        return (
            <div
                style={{
                display: 'inline-flex',
                verticalAlign: 'middle',
                cursor: 'pointer'
            }}>
                <FacebookShareButton
                    className="share-button"
                    title={this.props.title}
                    url={this.props.url}
                    picture={this.props.picture}>
                    <FacebookIcon size={32} round={true}/>
                </FacebookShareButton>
                <TwitterShareButton
                    className="share-button"
                    title={this.props.title}
                    url={this.props.url}
                    hashtags={["date2color"]}>
                    <TwitterIcon size={32} round={true}/>
                </TwitterShareButton>
                <WhatsappShareButton
                    className="share-button"
                    title={this.props.title}
                    url={this.props.url}
                    picture={this.props.picture}>
                    <WhatsappIcon size={32} round={true}/>
                </WhatsappShareButton>
            </div>
        );
    }
}

Share.propTypes = {
    title: PropTypes.string,
    url: PropTypes.string,
    picture: PropTypes.string
};

export default Share;