import { useState } from "react";

function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(null);

  function open(index = null) {
    setIndex(index);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    setIndex(null);
  }

  return { isOpen, index, open, close };
}

export default useModal;
