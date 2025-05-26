import React from "react";
import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";
import state from "../store";

const fashionPresetColors = [
  "#000000",
  "#FFFFFF",
  "#F5F5F5", // Black, White, Off White
  "#FF0000",
  "#800000",
  "#B22222", // Red tones
  "#FF69B4",
  "#FFC0CB",
  "#DB7093", // Pink tones
  "#FFA500",
  "#FFD700",
  "#FF8C00", // Orange and gold tones
  "#FFFF00",
  "#F0E68C",
  "#FFDAB9", // Yellow tones
  "#008000",
  "#00FF00",
  "#98FB98", // Green tones
  "#0000FF",
  "#1E90FF",
  "#87CEFA", // Blue tones
  "#4B0082",
  "#8A2BE2",
  "#9370DB", // Purple tones
  "#A52A2A",
  "#D2B48C",
  "#DEB887", // Earth tones
  "#808080",
  "#C0C0C0",
  "#A9A9A9", // Gray tones
];

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={(color) => (state.color = color.hex)}
        presetColors={fashionPresetColors}
      />
    </div>
  );
};

export default ColorPicker;
