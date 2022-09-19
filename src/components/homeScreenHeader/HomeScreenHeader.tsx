import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

import { scale } from '~/helpers/scale';
import styleSystem from '~/shared/styles';
import GeoPinIcon from '~/assets/icons/GeoPinIcon';
import SearchIcon from '~/assets/icons/SearchIcon';
import { resolveProfilePicURL } from '~/helpers/resolvePicURL';

type Props = {
  name: string | null;
  location: string | null;
  profilePictureURL: string | null;
};

const HomeScreenHeader: React.FC<Props> = props => {
  return (
    <View style={styles.container}>
      <FastImage
        style={{ width: scale(64), height: scale(64), borderRadius: 64 }}
        source={resolveProfilePicURL(props.profilePictureURL)}
      />
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: scale(8),
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <View style={styles.nameAndLocationContainer}>
          <Text style={styleSystem.typography.H4}>{props.name || ''}</Text>
          {props.location && (
            <View style={styles.locationContianer}>
              <GeoPinIcon width={14} height={14} color={styleSystem.colors.secondary.dark} />
              <Text style={[styleSystem.typography.labelSmall, { paddingLeft: scale(3) }]}>{props.location}</Text>
            </View>
          )}
        </View>
        <SearchIcon width={24} height={24} color={styleSystem.colors.secondary.dark} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(24),
    backgroundColor: styleSystem.colors.secondary.white,
    flexDirection: 'row',
    paddingBottom: scale(16),
    paddingTop: scale(32),
  },
  nameAndLocationContainer: {
    paddingLeft: scale(16),
    alignContent: 'center',
    justifyContent: 'center',
  },
  locationContianer: {
    flexDirection: 'row',
    paddingTop: scale(2),
    alignContent: 'center',
  },
});

export default HomeScreenHeader;
