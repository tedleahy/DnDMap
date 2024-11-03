import { useState } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import Svg, { Line, G } from 'react-native-svg';

const gridSize = 50;
const lineColor = '#333';
const opacity = 0.2;

export default function GridOverlay() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Keep the grid's dimensions up-to-date
  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  const horizontalLinesCount = Math.floor(dimensions.height / gridSize);
  const horizontalLines = Array.from({ length: horizontalLinesCount + 1 }, (_, i) => (
    <Line
      key={'x-' + i}
      x1="0"
      y1={i * gridSize}
      x2="100%"
      y2={i * gridSize}
      stroke={lineColor}
      strokeWidth={1}
      opacity={opacity}
    />
  ));

  const verticalLinesCount = Math.floor(dimensions.width / gridSize);
  const verticalLines = Array.from({ length: verticalLinesCount + 1 }, (_, i) => (
    <Line
      key={'y-' + i}
      x1={i * gridSize}
      y1="0"
      x2={i * gridSize}
      y2="100%"
      stroke={lineColor}
      strokeWidth={1}
      opacity={opacity}
    />
  ));

  return (
    <View style={styles.gridContainer} onLayout={onLayout}>
      <Svg width="100%" height="100%">
        <G>
          {horizontalLines}
          {verticalLines}
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
