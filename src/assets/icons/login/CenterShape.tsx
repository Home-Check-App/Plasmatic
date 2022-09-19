import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function CenterShape(props: SvgProps) {
  return (
    <Svg width={215} height={251} viewBox="0 0 215 251" fill="none">
      <Path d="M4 191.5L112 0h103L79.5 232.5c-7.667 11-29.7 27.3-56.5 10.5S-.833 202.167 4 191.5z" fill="#2A98EE50" />
    </Svg>
  );
}

export default CenterShape;
