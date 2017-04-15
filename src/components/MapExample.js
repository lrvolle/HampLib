
/* eslint no-console: 0 */

import React, { Component, PropTypes } from 'react';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
} from 'react-native';

const accessToken = 'pk.eyJ1IjoibHJ2b2xsZSIsImEiOiJjajFpcndxN2swMWJ0MnFvaG1uaWNlOHVkIn0.ptRQFGDH9slee6PowWtXOg';
Mapbox.setAccessToken(accessToken);

class MapExample extends Component {

    constructor(props) {
        super(props);

        this._onRegionDidChange = this._onRegionDidChange.bind(this);
        this._onRegionWillChange = this._onRegionWillChange.bind(this);
        this._onOpenAnnotation = this._onOpenAnnotation.bind(this);
        this._onRightAnnotationTapped = this._onRightAnnotationTapped.bind(this);
        this._onChangeUserTrackingMode = this._onChangeUserTrackingMode.bind(this);
        this._onUpdateUserLocation = this._onUpdateUserLocation.bind(this);
        this._onLongPress = this._onLongPress.bind(this);
        this._onTap = this._onTap.bind(this);
        this._onFinishLoadingMap = this._onFinishLoadingMap.bind(this);
        this._onStartLoadingMap = this._onStartLoadingMap.bind(this);
        this._onLocateUserFailed = this._onLocateUserFailed.bind(this);
        this._onNativeComponentMount = this._onNativeComponentMount.bind(this);
    }

  static componentName = 'MapExample';

  static propTypes = {

    title: PropTypes.string,

  }

  state = {
    center: {
      latitude: 40.72052634,
      longitude: -73.97686958312988,
    },
    zoom: 11,
    userTrackingMode: Mapbox.userTrackingMode.none,
    annotations: [{
      coordinates: [40.72052634, -73.97686958312988],
      type: 'point',
      title: 'This is marker 1',
      subtitle: 'It has a rightCalloutAccessory too',
      rightCalloutAccessory: {
        source: { uri: 'https://cldup.com/9Lp0EaBw5s.png' },
        height: 25,
        width: 25,
      },
      annotationImage: {
        source: { uri: 'https://cldup.com/CnRLZem9k9.png' },
        height: 25,
        width: 25,
      },
      id: 'marker1',
    }, {
      coordinates: [40.714541341726175, -74.00579452514648],
      type: 'point',
      title: 'Important!',
      subtitle: 'Neat, this is a custom annotation image',
      annotationImage: {
        source: { uri: 'https://cldup.com/7NLZklp8zS.png' },
        height: 25,
        width: 25,
      },
      id: 'marker2',
    }, {
      coordinates: [[40.76572150042782, -73.99429321289062], [40.743485405490695, -74.00218963623047], [40.728266950429735, -74.00218963623047], [40.728266950429735, -73.99154663085938], [40.73633186448861, -73.98983001708984], [40.74465591168391, -73.98914337158203], [40.749337730454826, -73.9870834350586]],
      type: 'polyline',
      strokeColor: '#00FB00',
      strokeWidth: 4,
      strokeAlpha: 0.5,
      id: 'foobar',
    }, {
      coordinates: [[40.749857912194386, -73.96820068359375], [40.741924698522055, -73.9735221862793], [40.735681504432264, -73.97523880004883], [40.7315190495212, -73.97438049316406], [40.729177554196376, -73.97180557250975], [40.72345355209305, -73.97438049316406], [40.719290332250544, -73.97455215454102], [40.71369559554873, -73.97729873657227], [40.71200407096382, -73.97850036621094], [40.71031250340588, -73.98691177368163], [40.71031250340588, -73.99154663085938]],
      type: 'polygon',
      fillAlpha: 1,
      strokeColor: '#ffffff',
      fillColor: '#0000ff',
      id: 'zap',
    }],
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={(map) => { this._map = map; }}
          style={styles.map}
          initialCenterCoordinate={this.state.center}
          initialZoomLevel={this.state.zoom}
          initialDirection={0}
          rotateEnabled
          scrollEnabled
          zoomEnabled
          showsUserLocation={false}
          styleURL={Mapbox.mapStyles.dark}
          userTrackingMode={this.state.userTrackingMode}
          annotations={this.state.annotations}
          annotationsAreImmutable
          onChangeUserTrackingMode={this.onChangeUserTrackingMode}
          onRegionDidChange={this.onRegionDidChange}
          onRegionWillChange={this.onRegionWillChange}
          onOpenAnnotation={this.onOpenAnnotation}
          onRightAnnotationTapped={this.onRightAnnotationTapped}
          onUpdateUserLocation={this.onUpdateUserLocation}
          onLongPress={this.onLongPress}
          onTap={this.onTap}
        />
        <ScrollView style={styles.scrollView}>
          {this._renderButtons()}
        </ScrollView>
      </View>
    );
  }

  _renderButtons() {
    return (
      <View>
        <Text onPress={() => this._map && this._map.setDirection(0)}>
          Set direction to 0
        </Text>
        <Text onPress={() => this._map && this._map.setZoomLevel(6)}>
          Zoom out to zoom level 6
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  map: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});

export default MapExample;
