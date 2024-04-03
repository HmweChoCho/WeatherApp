import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBox = ({onSearch, onSearchFourDay}) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (!city.trim()) {
      return;
    }
    onSearch(city);
    onSearchFourDay(city);
  };

  return (
    <View
      style={{
        position: 'absolute',
        paddingVertical: 20,
        paddingHorizontal: 10,
      }}>
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        {/* <Text style={{fontSize: 40, color: 'white'}}>Hello SG..</Text> */}
        {/* <Text style={{color: 'white', fontSize: 22, fontWeight: 'bold'}}>
          Search the city by name
        </Text> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 50,
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 16,
            marginHorizontal: 5,
          }}>
          <TextInput
            value={city}
            onChangeText={val => setCity(val)}
            placeholder="Search City"
            placeholderTextColor="white"
            style={{
              paddingHorizontal: 100,
              color: 'white',
              fontSize: 16,
            }}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Icon name="search" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SearchBox;
