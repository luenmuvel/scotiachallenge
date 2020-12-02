import React, { useRef } from "react";

const InputRange = ({
  min,
  max,
  handleInput,
  handleMouseUp,
}: {
  min: number;
  max: number;
  handleInput: Function;
  handleMouseUp: Function;
}) => {
  const range = useRef<HTMLInputElement>();
  return (
    <input
      ref={range}
      type="range"
      step="1"
      min={min}
      max={max}
      defaultValue="1"
      onInput={() => handleInput(range.current.value)}
      onMouseUp={() => handleMouseUp(range.current.value)}
    />
  );
};

export default InputRange;
