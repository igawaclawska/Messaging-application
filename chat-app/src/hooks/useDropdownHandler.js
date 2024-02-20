import { useState, useEffect, useRef } from 'react';

export const useDropdownHandler = (initialState = false, externalRef = null) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(initialState);
  const ref = useRef(null);

  useEffect(() => {
    const refToUse = externalRef || ref;

    function handleClickOutside(event) {
      if (refToUse.current && !refToUse.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, externalRef]);

  return {isDropdownOpen, setIsDropdownOpen, externalRef};
}
