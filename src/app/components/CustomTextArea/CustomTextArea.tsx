import * as React from "react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { useDebounce } from "@src/common/hooks/useDebounce";

type EmptyTextareaProps = {
  name: string;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export default function EmptyTextarea({
  name,
  placeholder,
  value,
  setValue,
}: EmptyTextareaProps) {
  const [inputValue, setInputValue] = useState<string>(value);
  const debouncedInputValue = useDebounce<string>(inputValue, 500);

  useEffect(() => {
    if (debouncedInputValue) {
      setValue(debouncedInputValue);
    }
  }, [debouncedInputValue]);

  return (
    <textarea
      style={{ width: "100%", maxWidth: "100%" }}
      aria-label="empty textarea"
      required
      rows={5}
      id={name}
      name={name}
      placeholder={placeholder}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
