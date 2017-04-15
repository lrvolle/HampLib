/**
 * Recipe Actions
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

import meals from '@jsondata/recipe_meal.json';

/**
 * Get Meals
 */
export function getMeals() {
  return function (dispatch) {
    return dispatch({
      type: 'MEALS_REPLACE',
      data: meals,
    });
  };
}

/**
 * Reset Meals
 */
export function reset() {
  return {
    type: 'MEALS_RESET',
  };
}
