
import React, {Component} from 'react';

var L = require('leaflet')
require('leaflet-choropleth');

import {geoStates} from "./states";

class Choropleth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            geojson: ''
        }

        this.gj = '';

        this.geoMap = '';

    }

    componentDidMount() {
        this.geoMap = L.map('geoMapId').setView([-37.814, 144.96332], 10);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiZGVlcGFrNnNwIiwiYSI6ImNqZTEyYnRmcTNzYWgyd3QzOHd1dzA1dGgifQ.glvYBXpk5_BtBvckbtHdEw', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets'
        }).addTo(this.geoMap);


        this.gj =  L.geoJson(geoStates, {
          style: (feature) => this._mapStyles(feature),
          onEachFeature: (feature, layer) => this._onEachFeature(feature, layer)
        }).addTo(this.geoMap);

    }

    _mapStyles(feature) {
        return {
            fillColor: this._getColor(feature.properties.relativity*100),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    _getColor(d) {
      return d > 1000 ? '#800026' :
      d > 500  ? '#BD0026' :
      d > 200  ? '#E31A1C' :
      d > 100  ? '#FC4E2A' :
      d > 50   ? '#FD8D3C' :
      d > 20   ? '#FEB24C' :
      d > 10   ? '#FED976' :
                 '#FFEDA0';
    }

    _onEachFeature(feature, layer) {
        layer.on({
            mouseover: this._highlightFeature.bind(this),
            mouseout: this._resetHighlight.bind(this),
            // click: this._zoomToFeature.bind(this)
        });
    }

    _highlightFeature(e) {
        var layer = e.target;
    
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
    
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }

        layer.bindTooltip(`${layer.feature.properties.SA2_NAME} - ${layer.feature.properties.winRate*100}%`).openTooltip();
    }

    _resetHighlight(e) {
        this.setState({geojson: this.gj});
        
        this.state.geojson.resetStyle(e.target);
    }

    _zoomToFeature(e) {
        this.geoMap.fitBounds(e.target.getBounds());
    }
    
    render() {
        return (
            <div id="geoMapId"></div>
        );
    }

}

export default Choropleth