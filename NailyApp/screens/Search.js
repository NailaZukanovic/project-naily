import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  FlatList,
  StatusBar,
} from 'react-native';
import {COLORS, SIZES, FONTS} from '../constants/index';
import {Icon} from 'react-native-elements';
import {searchStyles} from '../styles/index';

import {discoverySalons} from '../dummy/index';

const renderSearchResultItem = ({item}) => (
  <View style={searchStyles.searchResultItemContainer}>
    <View style={{...searchStyles.searchTitleContainer}}>
      <Text style={{...FONTS.h4}}>{item.salon}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="heart" type="ant-design" size={15} color={COLORS.roseRed} />
        <Text style={{margin: SIZES.margin5}}>1.2k</Text>
      </View>
    </View>
    <Text>{item.address}</Text>
  </View>
);

const SearchResultList = props => {
  return (
    <FlatList
      data={props.results}
      renderItem={renderSearchResultItem}
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
      style={{
        ...searchStyles.searchResultList,
      }}
    />
  );
};

const Search = () => {
  return (
    <SafeAreaView>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.darkPrimary}
      />
      <View
        style={{
          ...searchStyles.searchContainer,
        }}>
        <TouchableOpacity style={searchStyles.currentLocationButton}>
          <Icon
            name="location-arrow"
            type="font-awesome"
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Search for beauty salons ..."
          style={searchStyles.searchTextInput}
        />
      </View>

      <View style={{paddingBottom: 100}}>
        <SearchResultList results={discoverySalons} />
      </View>
    </SafeAreaView>
  );
};

export default Search;
