import { Coordinates } from "./Coordinates";
import { Player } from "@/types";

export type Border = "north" | "east" | "south" | "west";

export type GameBox = {
  position: Coordinates;
  selectedBorders: Set<Border>;
  externalBorders: Set<Border>;
  completedBy?: Player;
};
