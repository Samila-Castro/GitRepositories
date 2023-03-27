import styles from "./Header.module.css";
import { GithubLogo } from "@phosphor-icons/react";
import { useState } from "react";
import React from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

interface HeaderProps {
  toggletheme: (value: boolean) => void;
}
export const Header = ({ toggletheme }: HeaderProps) => {
  const [isDarkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = (checked: boolean) => {
    toggletheme(checked);
    setDarkMode(checked);
  };
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <GithubLogo size={35} color="#d95ed5" weight="duotone" />
        <h2>Search profiles on github </h2>
      </div>

      <DarkModeSwitch
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={20}
        color="#fff"
      />
    </header>
  );
};
