import React from 'react';

import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import PartnerCategoryItem from '~/components/partnerCategoryItem/PartnerCategoryItem';
import PartnerOfferItem from '~/components/partnerOfferItem/PartnerOfferItem';
import PartnersScreenHeader from '~/components/partnersScreenHeader/PartnersScreenHeader';
import { scale } from '~/helpers/scale';
import styleSystem from '~/shared/styles';

const PartnersScreenView = () => {
  return (
    <View style={{ flex: 1 }}>
      <PartnersScreenHeader searchPartners={() => undefined} />
      <ScrollView>
        <View style={styles.offersSectionContainer}>
          <FlatList
            nestedScrollEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            data={['all', 'fashion', 'tech', 'travel', 'movies']}
            keyExtractor={i => `${i}`}
            renderItem={({ item }) => <PartnerCategoryItem isSelected={false} category={item as any} />}
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: scale(16) }}
          />
          <View style={{ height: scale(2), backgroundColor: styleSystem.colors.ui.homeBackground }} />
          <View style={styles.offersList}>
            <Text style={[styleSystem.typography.labelBig, { paddingBottom: scale(16) }]}>Top Offers</Text>
            <PartnerOfferItem />
            <PartnerOfferItem />
          </View>
        </View>
        <Text>Partners!</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  offersSectionContainer: {
    marginVertical: scale(16),
    backgroundColor: styleSystem.colors.secondary.white,
    paddingVertical: scale(16),
  },
  offersList: {
    paddingTop: scale(16),
    paddingHorizontal: scale(24),
  },
});

export default PartnersScreenView;
