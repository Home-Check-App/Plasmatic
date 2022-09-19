import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={464} height={418} viewBox="0 0 464 418" fill="none" {...props}>
      <Path
        d="M3 360.5L198 .5h265l-220.5 388c-12 22.5-25.667 27.667-33 28.5H39C.2 408.2-1.167 375.667 3 360.5z"
        fill="#2A98EE"
        stroke="#2A98EE"
      />
    </Svg>
  );
}

export default SvgComponent;
