import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import images from '~/assets/images';
import { scale } from '~/helpers/scale';
import styleSystem from '~/shared/styles';

const PartnerOfferItem = () => {
  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.container}>
      <FastImage style={{ height: scale(186), width: '100%' }} source={images.partners1} />
      <View style={styles.contentContainer}>
        <View style={{ padding: scale(16) }}>
          <Text style={[styleSystem.typography.H3, { color: styleSystem.colors.secondary.white }]}>Uber Eats</Text>
          <Text
            style={[styleSystem.typography.labelMedium, { color: styleSystem.colors.secondary.white, opacity: 0.65 }]}>
            25% OFF
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.reedemLabelContainer}>
            <Text style={[styleSystem.typography.button, { color: styleSystem.colors.primary.black }]}>Redeem</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: scale(8),
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: styleSystem.colors.ui.darkOverlay,
    justifyContent: 'space-between',
  },
  reedemLabelContainer: {
    borderTopRightRadius: 15,
    backgroundColor: styleSystem.colors.secondary.white,
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
  },
});

export default PartnerOfferItem;
