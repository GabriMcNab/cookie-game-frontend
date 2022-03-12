export type Border = "north" | "east" | "south" | "west";

export type GameBox = {
  selectedBorders: Set<Border>;
};
