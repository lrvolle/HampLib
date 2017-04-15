/**
 * Error Screen
 *
    <Error text={'Server is down'} />
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component, PropTypes } from 'react';
import Mapbox, { MapView } from 'react-native-mapbox-gl';

import {
    StyleSheet,
    StatusBar,
    View,
    ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

// Consts and Libs
import { AppStyles } from '@theme/';

// Components
import { Spacer, Text, Button } from '@ui/';


const accessToken = 'pk.eyJ1IjoibHJ2b2xsZSIsImEiOiJjajFpcndxN2swMWJ0MnFvaG1uaWNlOHVkIn0.ptRQFGDH9slee6PowWtXOg';
Mapbox.setAccessToken(accessToken);

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

/* Component ==================================================================== */
class MapComponent extends Component {
  static componentName = 'MapComponent';

  constructor(props) {
    super(props);
  }




  render = () => <View style={styles.container}>
    <MapView
      ref={(map) => {
        this._map = map;
      }}
      style={styles.map}
      initialCenterCoordinate={{
          latitude: 42.325490,
          longitude: -72.532325
      }}
      initialZoomLevel={18}
      initialDirection={0}
      rotateEnabled
      scrollEnabled
      zoomEnabled
      showsUserLocation={false}
      styleUrl={'mapbox://styles/garretpremo/cj1jobkz7000v2smtqyainy4f'}
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
  </View>


}

/* Export Component ==================================================================== */
export default MapComponent;
