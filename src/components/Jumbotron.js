import React, { Component } from 'react';
import Background from '../../public/images/landing.jpg';

const style = {
    background: {
        background: `url(${Background})`,
        backgroundSize: 'cover',
        padding: '1px',
        opacity: '0.8'
    },
    text: {
        maxWidth: "600px",
        textAlign: "center",
        fontSize: "30px",
        lineHeight: "60px",
        marginLeft: "auto",
        marginRight: "auto"
    }
    
}

class Jumbotron extends Component {
    render() {
        return (
            <div id="jumbotron" style={style.background}>
                <div style={style.text}>
                    <h1>Ingresa una fecha y descubre su color!</h1>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Jumbotron;