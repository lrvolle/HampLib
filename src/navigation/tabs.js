/**
 * Tabs Scenes
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React from 'react';
import { Scene } from 'react-native-router-flux';

// Consts and Libs
import { AppConfig } from '@constants/';
import { AppStyles, AppSizes } from '@theme/';

// Components
import { TabIcon } from '@ui/';
import { NavbarMenuButton } from '@containers/ui/NavbarMenuButton/NavbarMenuButtonContainer';

import { MapView } from 'react-native-mapbox-gl';

import { MapExample } from '@components/MapExample';

console.log("ASDFSD" + MapExample);

// Scenes
import Placeholder from '@components/general/Placeholder';
import Error from '@components/general/Error';
import StyleGuide from '@containers/StyleGuideView';
import Recipes from '@containers/recipes/Browse/BrowseContainer';
import RecipeView from '@containers/recipes/RecipeView';
import MapComponent from "../components/general/MapComponent";

const navbarPropsTabs = {
  ...AppConfig.navbarProps,
  renderLeftButton: () => <NavbarMenuButton />,
  sceneStyle: {
    ...AppConfig.navbarProps.sceneStyle,
    paddingBottom: AppSizes.tabbarHeight,
  },
};

/* Routes ==================================================================== */
const scenes = (
  <Scene key={'tabBar'} tabs tabBarIconContainerStyle={AppStyles.tabbar} pressOpacity={0.95}>
    <Scene
      {...navbarPropsTabs}
      key={'recipes'}
      title={'Recipes'}
      icon={props => TabIcon({ ...props, icon: 'speaker-notes' })}
    >
      <Scene
        {...navbarPropsTabs}
        key={'recipesListing'}
        component={Recipes}
        title={AppConfig.appName}
        analyticsDesc={'Recipes: Browse Recipes'}
      />
      <Scene
        {...AppConfig.navbarProps}
        key={'recipeView'}
        component={RecipeView}
        getTitle={props => ((props.title) ? props.title : 'View Recipe')}
        analyticsDesc={'RecipeView: View Recipe'}
      />
    </Scene>

    <Scene
      key={'timeline'}
      {...navbarPropsTabs}
      title={'Coming Soon'}
      component={Placeholder}
      icon={props => TabIcon({ ...props, icon: 'search' })}
      analyticsDesc={'Placeholder: Coming Soon'}
    />

    <Scene
      key={'error'}
      {...navbarPropsTabs}
      title={'Library Map'}
      component={MapComponent}
      icon={props => TabIcon({ ...props, icon: 'timeline' })}
      analyticsDesc={'Error: Example Error'}
    />

  </Scene>
);

export default scenes;
