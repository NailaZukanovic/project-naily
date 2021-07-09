import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  FlatList,
  StatusBar,
  Image,
} from 'react-native';
import {COLORS, SIZES, FONTS, SCREEN_NAMES} from '../constants/index';
import {Icon} from 'react-native-elements';
import {styles, searchStyles} from '../styles/index';

import {discoverySalons} from '../dummy/index';

const renderSearchResultItem = (item, navigation) => (
  <TouchableOpacity
    style={searchStyles.searchResultItemContainer}
    onPress={() => navigation.navigate(SCREEN_NAMES.salon)}>
    <View style={styles.shadow}>
      <Image
        style={{width: 60, height: 60, borderRadius: 30}}
        source={item.image}
        resizeMode="cover"
      />
    </View>
    <View style={{flex: 1, paddingStart: SIZES.padding}}>
      <View style={{...searchStyles.searchTitleContainer}}>
        <Text style={{...FONTS.h4}}>{item.salon}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name="heart"
            type="ant-design"
            size={15}
            color={COLORS.roseRed}
          />
          <Text style={{margin: SIZES.margin5}}>1.2k</Text>
        </View>
      </View>
      <Text>{item.address}</Text>
    </View>
  </TouchableOpacity>
);

const SearchResultList = props => {
  return (
    <FlatList
      data={props.results}
      renderItem={({item}) => renderSearchResultItem(item, props.navigation)}
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
      style={{
        ...searchStyles.searchResultList,
      }}
    />
  );
};

const Search = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white}}>
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
        <SearchResultList results={discoverySalons} navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default Search;
