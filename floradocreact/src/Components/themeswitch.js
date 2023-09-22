import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ThemeSwitch = () => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    }
  }, []);

  return (
    <div>
      <SwitchLabel>
        <SwitchInput type="checkbox" checked={isDark} onChange={toggleTheme} />
        <Slider />
      </SwitchLabel>
    </div>
  );
};
export default ThemeSwitch;


const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--primary);
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: var(--background);
    transition: 0.4s;
    border-radius: 50%;
  }

  ${SwitchInput}:checked + & {
    background-color: var(--text);
  }

  ${SwitchInput}:checked + &::before {
    transform: translateX(26px);
  }
`;
