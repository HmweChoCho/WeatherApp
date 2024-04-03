import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import React from 'react';
const CurrentWeather = ({currentData}) => {
  return (
    currentData &&
    currentData.cod != '404' && (
      <View>
        <Text style={{color: 'white', fontSize: 25}}>
          {currentData['name']}
        </Text>
        <Icon
          name="location-outline"
          size={20}
          color="white"
          style={{position: 'absolute', top: -10, right: -10}}
        />

        <Text style={{color: 'white', fontSize: 35}}>
          {Math.round((currentData['main']['temp'] - 273).toFixed(2))}
          &deg;C
        </Text>
        <Text style={{fontSize: 20, color: 'white'}}>
          {currentData['weather'][0]['main']}
        </Text>
      </View>
    )
  );
};

export default CurrentWeather;
