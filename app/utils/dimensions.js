import { Dimensions } from "react-native";

const MIN_ROW_COUNT = 2;
const MAX_ROW_COUNT = 5;
const DEFAULT_ITEM_SIZE = 180;

const screen = Dimensions.get("window");
const width = Math.min(screen.height, screen.width);

export default (() => {
  const itemSpace = Math.max(16, 0.04 * width);

  /* eslint-disable no-mixed-operators  */
  if (width < MIN_ROW_COUNT * DEFAULT_ITEM_SIZE + MIN_ROW_COUNT * itemSpace) {
    return {
      size: (width - MIN_ROW_COUNT * itemSpace) / MIN_ROW_COUNT,
      spacing: itemSpace
    };
  } else if (
    width <
    MAX_ROW_COUNT * DEFAULT_ITEM_SIZE + MAX_ROW_COUNT * itemSpace
  ) {
    return {
      size: (width - MAX_ROW_COUNT * itemSpace) / MAX_ROW_COUNT,
      spacing: itemSpace
    };
  }

  // Derive from: DEFAULT_ITEM_SIZE * count + itemSpace * count = width
  const count = Math.floor(
    (width - itemSpace) / (DEFAULT_ITEM_SIZE + itemSpace)
  );
  const expandedSpace = (width - DEFAULT_ITEM_SIZE * count) / count;
  return {
    size: DEFAULT_ITEM_SIZE,
    spacing: expandedSpace
  };
  /* eslint-enable no-mixed-operators  */
})();
