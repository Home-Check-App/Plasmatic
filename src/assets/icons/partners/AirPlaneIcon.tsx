import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function AirPlaneIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 66.275 66.275" {...props}>
      <Path d="M66.274 9.119a9.05 9.05 0 00-2.67-6.448C61.881.949 59.591 0 57.155 0s-4.726.949-6.506 2.73L39.876 14.107 9.784 6.464a2.997 2.997 0 00-2.859.787l-4.731 4.731a2.997 2.997 0 00.547 4.675l21.922 13.517-11.666 12.323-10.128.444a3 3 0 00-1.99 5.118l17.337 17.337a3 3 0 005.118-1.989l.446-10.132 12.368-11.71 13.466 21.964a3 3 0 004.679.553l4.731-4.731a3 3 0 00.791-2.844l-7.507-30.245 11.294-10.695a9.06 9.06 0 002.672-6.448zm-6.856 2.148L46.912 23.109a3.004 3.004 0 00-.85 2.901l7.52 30.297-.842.843-13.148-21.446c-.123-.2-.27-.387-.437-.553l-.349-.349a2.992 2.992 0 00-2.121-.879c-.741 0-1.483.273-2.063.821L18.993 49.547l.066-.064a5.92 5.92 0 00-.259.224 3 3 0 00-.96 2.07l-.201 4.559-7.698-7.698 4.554-.2a3.004 3.004 0 002.082-.972c.069-.075.133-.152.214-.251L31.527 31.65a3 3 0 00-.057-4.184l-.126-.126a2.991 2.991 0 00-.546-.432L9.119 13.541l.842-.842 30.145 7.656a3.006 3.006 0 002.917-.845L54.949 6.912c1.18-1.18 3.234-1.178 4.412 0 .589.589.913 1.372.913 2.205s-.325 1.617-.856 2.15z" />
    </Svg>
  );
}

export default AirPlaneIcon;
