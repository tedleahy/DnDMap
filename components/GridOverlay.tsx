import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Svg, { Line, G } from 'react-native-svg';

export const GRID_SIZE = 50;
const LINE_COLOR = '#333';
const OPACITY = 0.2;

export default function GridOverlay() {
  const { height, width } = useWindowDimensions();

  // Doubling the width and height when getting the line counts, and setting the SVG width and
  // height to 200% is a weird hack to get the grid to cover the entire screen.
  // The dimensions don't get updated correctly on device rotation; on the first rotate, nothing
  // happens, then on the second rotate, they get set to the dimensions from the first rotate.
  // On every subsequent rotate, they get set to the dimensions from the last rotate.
  // This means that the dimensions are only correct before the first rotate, and consequently
  // after rotating, the numbers of horizontal and vertical lines are always wrong.
  // That explains the doubling the width and height hack, but I'm not sure why the SVG width and
  // height need to be set to 200% to cover the entire screen.
  // I'm testing this on an 11" iPad Air, so I wouldn't be surprised if it breaks on bigger screen
  // sizes. On web, the dimensions update correctly, so it's fine there.
  // ¯\_(ツ)_/¯

  const horizontalLinesCount = Math.floor((height * 2) / GRID_SIZE);
  const horizontalLines = Array.from({ length: horizontalLinesCount + 1 }, (_, i) => (
    <Line
      key={'x-' + i}
      x1="0"
      y1={i * GRID_SIZE}
      x2="100%"
      y2={i * GRID_SIZE}
      stroke={LINE_COLOR}
      strokeWidth={1}
      opacity={OPACITY}
    />
  ));

  const verticalLinesCount = Math.floor((width * 2) / GRID_SIZE);
  const verticalLines = Array.from({ length: verticalLinesCount + 1 }, (_, i) => (
    <Line
      key={'y-' + i}
      x1={i * GRID_SIZE}
      y1="0"
      x2={i * GRID_SIZE}
      y2="100%"
      stroke={LINE_COLOR}
      strokeWidth={1}
      opacity={OPACITY}
    />
  ));

  return (
    <View style={styles.gridContainer}>
      <Svg width="200%" height="200%">
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
