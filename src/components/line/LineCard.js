import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import LogoMetro from "../../static/img/logo/logo-metro.png";
import LogoTramway from "../../static/img/logo/logo-tramway.png";
import LogoRer from "../../static/img/logo/logo-rer.png";
import LogoNoctilien from "../../static/img/logo/logo-noctilien.png";
import LogoBus from "../../static/img/logo/logo-bus.png";
import { getStations } from "../../actions/stations";


class LineCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }

    renderIcon(type) {
        switch (type) {
            case "Métro":
                return LogoMetro;
            case "Tramway":
                return LogoTramway;
            case "RER":
                return LogoRer;
            case "Noctilien":
                return LogoNoctilien;
            case "Bus":
                return LogoBus;
            default:
                return null;
        }
    }

    getStations(line) {
        if (this.props.stationsList.some(sL => sL.line === line)) {
            this.toggleCollapse();
        } else {
            this.props.onClick && this.props.onClick();
            this.toggleCollapse();
        }
    }

    toggleCollapse() {
        this.setState({isOpen: !this.state.isOpen})
    }

render() {
    return (
        <div className={`trafficCard__container ${this.state.isOpen ? "isOpen" : ""}`}>
            <div 
                className="trafficCard"
                onClick={() => this.getStations(this.props.lineItem.code)}
            >
                <div className="trafficCard__header">
                    <img className="trafficCard__icon" src={this.renderIcon(this.props.type)} alt={"Icône de " + this.props.type + " " + this.props.lineItem.code} />
                    <h2 className="trafficCard__line">{this.props.lineItem.code}</h2>
                </div>
                <div className="trafficCard__content">
                    <p className="trafficCard__title">{this.props.lineItem.name}</p>
                    <p className="trafficCard__message">Directions : {this.props.lineItem.directions}</p>
                </div>
            </div>
            <div className="trafficCard__collapse">
                {this.props.stationsList.some(sL => sL.line === this.props.lineItem.code) && 
                this.props.stationsList.find(sL => sL.line === this.props.lineItem.code).stations.map(s => (
                    <span key={s.slug}>{s.name}</span>
                ))}
            </div>
        </div>
    )}
}

LineCard.propTypes = {
    /** The item which is containing traffic information */
    lineItem: PropTypes.object.isRequired,
    /** The type of traffic */
    type: PropTypes.oneOf(['Métro', 'Tramway', 'RER', 'Noctilien', 'Bus']).isRequired
};

export default LineCard;