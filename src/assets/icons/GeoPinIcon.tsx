import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function GeoPinIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 492.452 492.452" {...props}>
      <Path
        fill={props.color}
        d="M246.181 0C127.095 0 59.533 102.676 84.72 211.82c17.938 77.722 126.259 280.631 161.462 280.631 32.892 0 143.243-202.975 161.463-280.631C432.996 103.74 365.965 0 246.181 0zm.051 224.97c-34.38 0-62.244-27.863-62.244-62.244s27.864-62.244 62.244-62.244c34.38 0 62.244 27.863 62.244 62.244s-27.864 62.244-62.244 62.244z"
      />
    </Svg>
  );
}

export default GeoPinIcon;
