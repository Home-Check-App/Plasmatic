import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function LeftShape(props: SvgProps) {
  return (
    <Svg width={346} height={316} viewBox="0 0 346 316" fill="none" {...props}>
      <Path d="M184.5 293l160-291.5L1 5v310.5h144.5c19.2 0 34-15 39-22.5z" fill="#203052" stroke="#203052" />
    </Svg>
  );
}

export default LeftShape;
