type Direction = "left" | "right" | "up" | "down";

export const variants = (direction: Direction) => ({
  initial: {
    opacity: 0,
    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
    y: direction === "up" ? "-100%" : direction === "down" ? "100%" : 0,
  },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
  },
});
