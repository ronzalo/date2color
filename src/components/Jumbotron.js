import React, { Component } from 'react';
import Background from '../../public/images/landing.jpg';

const style = {
    background: {
        background: `url(${Background})`,
        backgroundSize: 'cover',
        padding: '1px',
        opacity: '0.8',
        height: '800px'
    },
    text: {
        maxWidth: "600px",
        textAlign: "center",
        fontSize: "30px",
        lineHeight: "60px",
        marginLeft: "auto",
        marginRight: "auto"
    },
    form: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "10px"
    }
    
}

class Jumbotron extends Component {
    render() {
        return (
            <div id="jumbotron" style={style.background}>
                <div style={style.text}>
                    <h1>Ingresa una fecha y descubre su color!</h1>
                    <div style={style.form}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Jumbotron;