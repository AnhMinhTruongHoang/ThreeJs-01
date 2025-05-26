import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";
import state from "../store";

const fashionPresetColors = [
  "#000000",
  "#FFFFFF",
  "#F5F5F5",
  "#FF0000",
  "#800000",
  "#B22222",
  "#FF69B4",
  "#FFC0CB",
  "#DB7093",
  "#FFA500",
  "#FFD700",
  "#FF8C00",
  "#FFFF00",
  "#F0E68C",
  "#FFDAB9",
  "#008000",
  "#00FF00",
  "#98FB98",
  "#0000FF",
  "#1E90FF",
  "#87CEFA",
  "#4B0082",
  "#8A2BE2",
  "#9370DB",
  "#A52A2A",
  "#D2B48C",
  "#DEB887",
  "#808080",
  "#C0C0C0",
  "#A9A9A9",
];

const isValidHex = (hex) => /^#([0-9A-F]{3}){1,2}$/i.test(hex);

const ColorPicker = () => {
  const snap = useSnapshot(state);
  const [inputValue, setInputValue] = useState(snap.color);

  const handleInputChange = (e) => {
    const newColor = e.target.value;
    setInputValue(newColor);
    if (isValidHex(newColor)) {
      state.color = newColor;
    }
  };

  return (
    <div className="absolute left-full ml-3 flex flex-col items-start gap-2 bg-white p-3 rounded shadow">
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={(color) => {
          state.color = color.hex;
          setInputValue(color.hex);
        }}
        presetColors={fashionPresetColors}
      />
      <div className="w-full flex justify-center mt-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="#FFFFFF"
          className="mt-2 border border-gray-300 rounded px-2 py-1 w-32 text-sm"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
