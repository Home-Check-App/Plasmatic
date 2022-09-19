import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function AppLogo(props: SvgProps) {
  return (
    <Svg width={87} height={61} viewBox="0 0 87 61" fill="none" {...props}>
      <G filter="url(#prefix__filter0_d)">
        <Path d="M14 51h60.5" stroke="#fff" strokeWidth={4} />
      </G>
      <G filter="url(#prefix__filter1_d)">
        <Path
          d="M7 42.5L29.5 6C32 1 34 4 35 6l22.5 39.5c1 1.667 3.7 5 6.5 5h10.5c5.5-2 5.5-5 5.5-8.5-3.5-6-15.5-25.667-22-37-.5-1.5-2.3-3.2-3.5 0C53.3 8.2 38.333 33 31 45c-1.333 1.833-4.7 5.5-7.5 5.5H11c-1.833-.5-5.2-2.8-4-8z"
          stroke="#fff"
          strokeWidth={5}
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
}

export default AppLogo;
