import React from "react";
import PropTypes from "prop-types";
import LogoMetro from "../../static/img/logo/logo-metro.png";
import LogoTramway from "../../static/img/logo/logo-tramway.png";
import LogoRer from "../../static/img/logo/logo-rer.png";
import LogoNoctilien from "../../static/img/logo/logo-noctilien.png";
import LogoBus from "../../static/img/logo/logo-bus.png";
import Icon from "antd/lib/icon";
import Tooltip from "antd/lib/tooltip";

function renderIcon(type) {
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

const LineCard = (props) => (
    <Tooltip
        className="trafficCard"
        title={
            props.isLiked
                ? `Cliquez sur la carte pour enlever ${props.lineItem.name} de la liste des favoris`
                : `Cliquez sur la carte pour mettre ${props.lineItem.name} en favori`
        }
        onClick={() => props.onClick(props.lineItem, !props.isLiked)}
    >
        <div className="trafficCard__header">
            <img className="trafficCard__icon" src={renderIcon(props.type)} alt={"Icône de " + props.type + " " + props.lineItem.code} />
            <h2 className="trafficCard__line">{props.lineItem.code}</h2>
        </div>
        <div className="trafficCard__content">
            <p className="trafficCard__title">{props.lineItem.name}</p>
            <p className="trafficCard__message">Directions : {props.lineItem.directions}</p>
        </div>
        {
            !props.removeLikeButton
                ? props.isLiked
                    ? <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
                    : <Icon type="heart" />
                : null
        }
    </Tooltip>
);

LineCard.propTypes = {
    /** The item which is containing traffic information */
    lineItem: PropTypes.object.isRequired,
    /** If the line is in favorite list */
    isLiked: PropTypes.bool,
    /** If the boolean is true, remove the like button */
    removeLikeButton: PropTypes.bool,
    /** The type of traffic */
    type: PropTypes.oneOf(['Métro', 'Tramway', 'RER', 'Noctilien', 'Bus']).isRequired
};

export default LineCard;
