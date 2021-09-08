import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import {COLORS, SIZES, FONTS, SCREEN_NAMES} from '../constants/index';
import Swiper from 'react-native-swiper';
import {Icon} from 'react-native-elements';
import {styles} from '../styles/index';
import {showImagePicker} from '../utils';

const ProductTab = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [durationHour, setDurationHour] = useState('');
  const [durationMinute, setDurationMinute] = useState('30');
  const [selectingImageIndex, setSelectingImageIndex] = useState(0);

  const [images, setImages] = useState([]);

  const closeModal = () => {
    setModalVisible(false);
    setProductName('');
    setDescription('');
    setDurationHour('');
    setDurationMinute('30');
    setSelectingImageIndex(0);
    setImages([]);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const imageCallback = response => {
    if (response.errorMessage) {
      Alert.alert('Error', response.errorMessage, 'Ok');
    } else if (response.assets) {
      var tmpImages = [...images];
      var isIos = Platform.OS === 'ios';
      response.assets.forEach(asset => {
        if (isIos) {
          asset.uri = asset.uri.replace('file://', '');
        }
        tmpImages.push(asset);
      });

      console.log(tmpImages);
      setImages(tmpImages);
    }
  };

  const addImage = () => {
    var options = {
      title: 'Add product image',
    };

    showImagePicker(options, imageCallback);
  };

  const deleteCurrentImage = _ => {
    var tmpImages = [...images];
    console.log(selectingImageIndex);
    tmpImages.splice(selectingImageIndex, 1);
    setImages(tmpImages);
  };

  const convertDurationToIntegerInMinutes = () => {
    var hour = 0;
    var minute = 0;

    if (durationHour !== '') {
      hour = parseInt(durationHour);
    }
    if (durationMinute !== '') {
      minute = parseInt(durationMinute);
    }
    return hour * 60 + minute;
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={mainStyles.productItem}
      onPress={() =>
        props.navigation.navigate(SCREEN_NAMES.productDetail, {
          title: item.title,
          likes: item.likes,
          image: item.image,
        })
      }>
      <View style={styles.lightShadow}>
        <Image
          source={item.image}
          style={mainStyles.productImage}
          resizeMode="cover"
        />
      </View>

      <Text style={{...FONTS.h4}}>{item.title}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name="heart"
          type="font-awesome"
          size={15}
          color={COLORS.roseRed}
        />
        <Text style={{paddingStart: SIZES.padding, ...FONTS.body4}}>
          {item.likes}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={mainStyles.listContainer}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}>
        <ScrollView style={{marginVertical: SIZES.margin * 3}}>
          <View style={mainStyles.modalContainer}>
            <TouchableOpacity
              style={mainStyles.modalCloseButton}
              onPress={closeModal}>
              <Icon name="close" type="font-awesome" size={SIZES.iconSize} />
            </TouchableOpacity>

            <View style={{height: SIZES.oneHalfHeight}}>
              <Text style={FONTS.h3}>Images</Text>
              {images.length > 0 ? (
                <Swiper
                  loop={false}
                  paginationStyle={{bottom: -20}}
                  style={mainStyles.imageSwiper}
                  onIndexChanged={index => setSelectingImageIndex(index)}>
                  {images.map(image => (
                    <Image
                      source={{uri: image.uri}}
                      resizeMode="cover"
                      style={mainStyles.imagePreview}
                    />
                  ))}
                </Swiper>
              ) : (
                <Text style={{...FONTS.body3, textAlign: 'center'}}>
                  There is no image yet
                </Text>
              )}
              <View style={mainStyles.imagePreviewActionButtonGroup}>
                <TouchableOpacity
                  style={mainStyles.imagePreviewActionButton}
                  onPress={addImage}>
                  <Text style={mainStyles.imagePreviewActionText}>
                    Add image
                  </Text>
                </TouchableOpacity>
                {images.length > 0 ? (
                  <TouchableOpacity
                    style={{
                      ...mainStyles.imagePreviewActionButton,
                      borderColor: COLORS.roseRed,
                    }}
                    onPress={deleteCurrentImage}>
                    <Text
                      style={{
                        ...mainStyles.imagePreviewActionText,
                        color: COLORS.roseRed,
                      }}>
                      Delete
                    </Text>
                    <Icon
                      name="trash"
                      type="font-awesome"
                      color={COLORS.roseRed}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>

            <View style={mainStyles.inputGroup}>
              <Text style={FONTS.h3}>Product name</Text>
              <TextInput
                onChangeText={setProductName}
                value={productName}
                style={mainStyles.input}
              />
            </View>
            <View style={mainStyles.inputGroup}>
              <Text style={FONTS.h3}>Starting price</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{...FONTS.h4, flex: 1, textAlign: 'center'}}>
                  $
                </Text>
                <TextInput
                  onChangeText={setDescription}
                  value={description}
                  style={{...mainStyles.input, flex: 10}}
                  textAlignVertical="top"
                />
              </View>
            </View>
            <View style={mainStyles.inputGroup}>
              <Text style={FONTS.h3}>Short description</Text>
              <TextInput
                onChangeText={setDescription}
                value={description}
                style={{...mainStyles.input, height: 100}}
                multiline={true}
                textAlignVertical="top"
              />
            </View>
            <View style={{...mainStyles.inputGroup}}>
              <Text style={FONTS.h3}>Duration</Text>

              <View style={{flexDirection: 'row'}}>
                <View style={mainStyles.durationGroup}>
                  <TextInput
                    onChangeText={value => setDurationHour(value.toString())}
                    value={durationHour}
                    style={{...mainStyles.input, flex: 1}}
                  />
                  <Text style={mainStyles.durationLabel}>Hours</Text>
                </View>
                <View style={mainStyles.durationGroup}>
                  <TextInput
                    onChangeText={value => setDurationMinute(value.toString)}
                    value={durationMinute}
                    style={{...mainStyles.input, flex: 1}}
                  />
                  <Text style={mainStyles.durationLabel}>Minutes</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={mainStyles.submitActionButton}>
              <Text style={mainStyles.submitActionButtonText}>
                Create new product
              </Text>
              <Icon
                name="check"
                type="font-awesome"
                size={SIZES.iconSize}
                color={COLORS.green}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...mainStyles.submitActionButton,
                borderWidth: 0,
                backgroundColor: COLORS.roseRed,
              }}
              onPress={closeModal}>
              <Text
                style={{
                  ...mainStyles.submitActionButtonText,
                  color: COLORS.white,
                }}>
                Cancel
              </Text>
              <Icon
                name="close"
                type="font-awesome"
                size={SIZES.iconSize}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
      {props.isOwner ? (
        <TouchableOpacity
          style={mainStyles.addProductButton}
          onPress={openModal}>
          <Icon
            type="font-awesome"
            name="plus"
            size={SIZES.smallIconSize}
            color={COLORS.white}
          />
          <Text style={mainStyles.addProductText}>Add new product</Text>
        </TouchableOpacity>
      ) : null}
      {props.products != null && props.products.length > 0 ? (
        <FlatList
          style={mainStyles.productList}
          data={props.products}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{justifyContent: 'space-between'}}
        />
      ) : (
        <Text>There is no product added yet</Text>
      )}
    </View>
  );
};

const mainStyles = StyleSheet.create({
  container: {
    height: '50%',
    marginBottom: SIZES.margin10 * 2,
    flex: 1,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.darkPrimary,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  inActiveDot: {
    backgroundColor: COLORS.gray,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: COLORS.orange,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  tabBar: {
    backgroundColor: COLORS.white,
  },
  activeTabTitle: {
    ...FONTS.body3,
    color: COLORS.black,
  },
  inActiveTabTitle: {
    ...FONTS.body3,
    color: COLORS.black,
  },
  listContainer: {
    flex: 1,
    alignItems: 'center',
  },
  productItem: {
    padding: SIZES.padding,
    flex: 1,
  },
  productImage: {
    width: SIZES.width / 2 - 20,
    height: SIZES.width / 2,
    borderRadius: SIZES.smallBorderRadius,
  },
  workerItemContainer: {
    flexDirection: 'row',
    marginHorizontal: SIZES.smallMargin,
    marginVertical: SIZES.tinyMargin,
    ...styles.lightShadow,
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.white,
  },
  workerDataContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
  },
  workerAvatar: {
    width: 100,
    height: 100,
    borderRadius: SIZES.smallBorderRadius,
  },
  reviewItem: {
    marginVertical: SIZES.smallMargin,
    paddingHorizontal: SIZES.padding,
    flex: 1,
  },
  contactContainer: {
    padding: SIZES.smallPadding,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
  },
  contactText: {
    ...FONTS.body3,
    paddingStart: SIZES.padding,
  },
  reviewTextInputContainer: {
    paddingHorizontal: SIZES.padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitButton: {
    padding: SIZES.padding,
  },
  addProductButton: {
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.oneHalfWidth,
    padding: SIZES.padding,
    backgroundColor: COLORS.green,
    marginVertical: SIZES.margin,
    ...styles.shadow,
  },
  addProductText: {
    flex: 1,
    textAlign: 'center',
    ...FONTS.h4,
    color: COLORS.white,
  },
  modalContainer: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.margin,
  },
  modalCloseButton: {
    alignItems: 'flex-end',
    marginHorizontal: SIZES.margin,
  },
  inputGroup: {
    justifyContent: 'center',
    marginVertical: SIZES.smallMargin,
  },
  input: {
    height: 40,
    marginVertical: SIZES.margin15,
    borderRadius: SIZES.smallBorderRadius,
    borderColor: COLORS.gray,
    borderWidth: 2,
    paddingHorizontal: SIZES.padding,
    color: COLORS.black,
  },
  durationGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  durationLabel: {
    ...FONTS.h4,
    flex: 1,
    marginHorizontal: SIZES.smallMargin,
  },
  imageSwiper: {height: SIZES.oneQuarterHeight, backgroundColor: COLORS.gray},
  imagePreview: {
    flex: 1,
  },
  imagePreviewActionButtonGroup: {
    marginVertical: SIZES.margin,
    alignItems: 'center',
  },
  imagePreviewActionButton: {
    borderRadius: SIZES.borderRadius,
    borderWidth: 1,
    paddingHorizontal: SIZES.padding,
    width: SIZES.oneHalfWidth,
    marginVertical: SIZES.smallMargin,
    flexDirection: 'row',
  },
  imagePreviewActionText: {
    textAlign: 'center',
    ...FONTS.body3,
    flex: 1,
  },

  submitActionButtonText: {
    textAlign: 'center',
    ...FONTS.h4,
    flex: 1,
    color: COLORS.green,
  },
  submitActionButton: {
    borderRadius: SIZES.borderRadius,
    borderWidth: 2,
    paddingHorizontal: SIZES.padding,
    marginVertical: SIZES.smallMargin,
    borderColor: COLORS.green,
    padding: SIZES.smallPadding,
    flexDirection: 'row',
  },
});

export default ProductTab;
