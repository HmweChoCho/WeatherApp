import {View, Text, ImageBackground, ScrollView, Image} from 'react-native';
import React, {useState} from 'react';
import {deviceHeight, deviceWidth} from './Dimensions';
import SearchBox from './Search';
import {ForecastAPI_URL, WeatherAPI_URL, ForecastIconURL} from './Constant';
import {getWeatherFromApiAsync} from './ApiCall';
import CurrentWeather from './WeatherInfo';
import style from './style';
import {Alert} from 'react-native';

export default function Home() {
  const [currentData, setCurrentData] = useState();
  const [otherForecastData, setOtherForecastData] = useState([]);
  const [hourlyForecastData, setHourlyForecastData] = useState([]);
  const getWeatherResponse = async city => {
    try {
      let json = await getWeatherFromApiAsync(city, WeatherAPI_URL);
      let result = isNullorEmpty(json);
      if (!result) {
        if (json.cod == '404') {
          Alert.alert('Not Found', json.message);
        }
      }
      setCurrentData(json);
    } catch (error) {
      console.error(error);
    }
  };

  const getForecastFromApiAsync = async city => {
    try {
      // const response = await fetch(`${ForecastAPI_URL}&q=${city}`);
      // const json = await response.json();
      // console.log(new Date().getUTCDate());
      // console.log(new Date(json['list'][0]['dt_txt']).getUTCDate());
      let json = await getWeatherFromApiAsync(city, ForecastAPI_URL);
      const nextFourDaysForecast =
        json &&
        json['list'] &&
        json['list'].filter(forecastItem => {
          // console.log(new Date(forecastItem['dt_txt']).getUTCDate());
          return (
            new Date(forecastItem['dt_txt']) > new Date() &&
            new Date(forecastItem['dt_txt']).getUTCDate() !=
              new Date().getUTCDate()
          );
        });
      const forecastData =
        nextFourDaysForecast &&
        nextFourDaysForecast.map(forecastItem => {
          return {
            id: forecastItem['weather'][0]['id'],
            date: forecastItem['dt_txt'],
            temperature: forecastItem['main']['temp'],
            humidity: forecastItem['main']['humidity'],
            windSpeed: forecastItem['wind']['speed'],
            weatherDescription: forecastItem['weather'][0]['description'],
            iconId: `${ForecastIconURL}${forecastItem['weather'][0]['icon']}.png`,
          };
        });

      const hourlyForecastRaw =
        json && json['list']
          ? json['list'].filter(forecastItem => {
              // console.log(new Date(forecastItem['dt_txt']).getUTCDate());
              return (
                new Date(forecastItem['dt_txt']).getHours() >
                  new Date().getHours() &&
                new Date(forecastItem['dt_txt']).getUTCDate() ==
                  new Date().getUTCDate()
              );
            })
          : [];
      const hourlyForecastData =
        hourlyForecastRaw && json['list']
          ? hourlyForecastRaw.map(forecastItem => {
              return {
                id: forecastItem['weather'][0]['id'],
                date: new Date(forecastItem['dt_txt']).getHours(),
                temperature: forecastItem['main']['temp'],
                iconId: `${ForecastIconURL}${forecastItem['weather'][0]['icon']}.png`,
              };
            })
          : [];
      const uniqueDatesMap = new Map();

      const uniqueForecastData =
        forecastData &&
        forecastData.reduce((newData, currentValue) => {
          const date = new Date(currentValue.date).toLocaleDateString();

          if (!uniqueDatesMap.has(date)) {
            uniqueDatesMap.set(date, true);
            newData.push(currentValue);
          }

          return newData;
        }, []);
      setOtherForecastData(uniqueForecastData);
      setHourlyForecastData(hourlyForecastData);
    } catch (error) {
      console.error(error);
    }
  };

  const formatAMPM = hrs => {
    let ampm = hrs >= 12 ? 'pm' : 'am';
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12;
    let hrStr = `${hrs} :00  ${ampm}`;
    return hrStr;
  };

  const formatDay = dateString => {
    const date = new Date(dateString);
    const day = date.getDay();
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var d = new Date(dateString);
    var dayName = day == new Date().getDay() + 1 ? 'Tomorrow' : days[day];
    return `${dayName}`;
  };

  const isNullorEmpty = param => {
    let res = false;
    if (param == undefined || param == '' || param == null) {
      res = true;
    }
    return res;
  };

  return (
    <View>
      <ImageBackground
        source={require('./assets/images/image8.jpg')}
        style={{height: deviceHeight, width: deviceWidth}}
        imageStyle={{
          opacity: 0.6,
          backgroundColor: 'black',
        }}>
        <SearchBox
          onSearch={getWeatherResponse}
          onSearchFourDay={getForecastFromApiAsync}
        />
        {currentData && currentData.cod != '404' && currentData ? (
          <View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: deviceHeight - 100,
                marginTop: 150,
              }}>
              <CurrentWeather currentData={currentData} />
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {hourlyForecastData.map((item, index) => (
                  <View key={index} style={style.hourlyForecastItem}>
                    <Text style={{color: '#ffffff'}}>
                      {formatAMPM(item.date)}
                    </Text>
                    <Image
                      src={item.iconId}
                      style={{
                        height: 60,
                        width: 50,
                        padding: 40,
                        paddingBottom: 10,
                      }}
                    />
                    <Text
                      style={{
                        color: '#ffffff',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        paddingLeft: 10,
                      }}>
                      {Math.round((item.temperature - 273).toFixed(2))}&deg;C
                    </Text>
                  </View>
                ))}
              </ScrollView>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 22,
                  }}>
                  Weather forecast
                </Text>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 15}}>
                {otherForecastData &&
                  otherForecastData.map((forecastItem, index) => (
                    <View key={index} style={style.forecastItem}>
                      <Text style={{color: '#ffffff'}}>
                        {formatDay(forecastItem.date)}
                      </Text>
                      <Image
                        src={forecastItem.iconId}
                        style={{
                          height: 60,
                          width: 50,
                          padding: 40,
                          paddingBottom: 10,
                        }}
                      />
                      <Text
                        style={{
                          color: '#ffffff',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          paddingLeft: 10,
                        }}>
                        {forecastItem.weatherDescription}
                      </Text>
                    </View>
                  ))}
              </ScrollView>
            </View>
          </View>
        ) : null}
      </ImageBackground>
    </View>
  );
}
