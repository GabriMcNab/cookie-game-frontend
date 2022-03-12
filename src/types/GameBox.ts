import { Coordinates } from "./Coordinates";

export type Border = "north" | "east" | "south" | "west";

export type GameBox = {
  position: Coordinates;
  selectedBorders: Set<Border>;
  externalBorders: Set<Border>;
};
