import { StyleSheet } from 'react-native';
import { scale } from '~/helpers/scale';
import colors from './colors';

const typography = StyleSheet.create({
  H1: { fontFamily: 'avenir-heavy', fontSize: scale(36), color: colors.secondary.white },
  H2: { fontFamily: 'avenir-heavy', fontSize: scale(28), color: colors.primary.black },
  H3: { fontFamily: 'avenir-heavy', fontSize: scale(22), color: colors.primary.black },
  H4: { fontFamily: 'avenir-heavy', fontSize: scale(18), color: colors.primary.black },
  H5: { fontFamily: 'avenir-heavy', fontSize: scale(14), color: colors.primary.black },
  button: {
    fontFamily: 'avenir-heavy',
    fontSize: scale(14),
    color: colors.secondary.white,
    textTransform: 'uppercase',
  },
  labelSmall: {
    fontFamily: 'avenir-roman',
    fontSize: scale(12),
    color: colors.secondary.dark,
  },
  labelMedium: {
    fontFamily: 'avenir-roman',
    fontSize: scale(13),
    color: colors.secondary.dark,
  },
  labelBig: {
    fontFamily: 'avenir-heavy',
    fontSize: scale(15),
    color: colors.secondary.dark,
  },
});

export default typography;
