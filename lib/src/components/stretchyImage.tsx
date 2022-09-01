import React, { useMemo } from 'react';
import { View, Animated, LayoutChangeEvent } from 'react-native';
import { StretchyProps } from '../types';
import CachedImage from 'expo-cached-image'
import { stretchyImageStyles as styles } from './styles';

export interface StretchyImageProps
  extends Omit<StretchyProps, 'backgroundColor' | 'foreground' | 'onScroll'> {
  animation: Animated.Value;
  imageHeight: number;
  onLayout(event: LayoutChangeEvent): void;
}
const AnimatedImageBackground = Animated.createAnimatedComponent(CachedImage);

export const StretchyImage: React.FC<StretchyImageProps> = ({
  animation,
  image,
  imageResizeMode,
  imageWrapperStyle,
  imageHeight,
  imageOverlay,
  onLayout,
  cacheKey
}) => {
  const transformStyles = useMemo(
    () => ({
      transform: [
        {
          translateY: animation.interpolate({
            inputRange: [-imageHeight, 0, imageHeight],
            outputRange: [imageHeight / 2, 0, -imageHeight / 2],
          }),
        },
        {
          scale: animation.interpolate({
            inputRange: [-imageHeight, 0, imageHeight],
            outputRange: [2, 1, 1],
          }),
        },
      ],
    }),
    [animation, imageHeight],
  );

  return (
    <View
      style={[imageWrapperStyle, styles.wrapper, { height: imageHeight }]}
      onLayout={onLayout}>
      <AnimatedImageBackground
        source={image || {}}
        resizeMode={imageResizeMode}
        cacheKey={cacheKey}
        style={[styles.animatedImageBackground, transformStyles]}>
        {Boolean(imageOverlay) && imageOverlay}
      </AnimatedImageBackground>
    </View>
  );
};
