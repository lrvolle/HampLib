/**
 * Recipe View Screen
 *  - The individual recipe screen
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';

// Consts and Libs
import { AppStyles } from '@theme/';

// Components
import { Card, Text } from '@ui/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  favourite: {
    position: 'absolute',
    top: -45,
    right: 0,
  },
});

/* Component ==================================================================== */
class RecipeCard extends Component {
  static componentName = 'RecipeCard';

  static propTypes = {
    title: PropTypes.string.isRequired,
      room: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    onPressFavourite: PropTypes.func,
    isFavourite: PropTypes.bool,
  }

  static defaultProps = {
    onPress: null,
    onPressFavourite: null,
    isFavourite: null,
  }

  render = () => {
    const { title, room, url, onPress, onPressFavourite, isFavourite } = this.props;

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <Card>
          <View style={[AppStyles.paddingBottomSml]}>
            <Text h3>{title}</Text>
            <Text>{room}</Text>

            {!!onPressFavourite &&
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPressFavourite}
                style={[styles.favourite]}
              >
                <Icon
                  raised
                  name={'star-border'}
                  color={isFavourite ? '#FFFFFF' : '#FDC12D'}
                  containerStyle={{
                    backgroundColor: isFavourite ? '#FDC12D' : '#FFFFFF',
                  }}
                />
              </TouchableOpacity>
            }
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

/* Export Component ==================================================================== */
export default RecipeCard;
