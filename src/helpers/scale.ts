import { Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

// Guideline size is based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;

export const scale = (size: number) => (width / guidelineBaseWidth) * size;
