import * as ReactNative from 'react-native';
import { ImageSourcePropType } from 'react-native';

export type StretchyImage = ImageSourcePropType;

export type StretchyOnScroll = (
  position: number,
  reachedToBottomOfHeader: boolean,
) => void;

export interface StretchyProps {
  backgroundColor?: string;
  image?: StretchyImage;
  imageHeight?: number;
  imageResizeMode?: ReactNative.ImageResizeMode;
  imageWrapperStyle?: ReactNative.ViewStyle;
  imageOverlay?: React.ReactElement;
  foreground?: React.ReactElement;
  onScroll?: StretchyOnScroll;
  cacheKey?: string
}
