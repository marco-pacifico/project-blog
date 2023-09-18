'use client'
import React from 'react';
import clsx from 'clsx';
import { Rss, Sun, Moon } from 'react-feather';
import Cookie from 'js-cookie';
import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './Header.module.css';

function Header({ initialTheme, className, ...delegated }) {

  const [theme, setTheme] = React.useState(initialTheme);

  function handleThemeChange() {
    // Create a variable to store the next theme (can't update state directly)
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    // Change the html data attribute = to the value of the next theme (e.ge html data-theme="dark")
    document.documentElement.setAttribute("color-theme", nextTheme);
    // Set the theme in cookies
    Cookie.set('color-theme', nextTheme, {
      expires: 1000,
    }); 

    // Update the state
    setTheme(nextTheme);
  }
  

  return (
    <header
      className={clsx(styles.wrapper, className)}
      {...delegated}
    >
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>
            View RSS feed
          </VisuallyHidden>
        </button>
        <button onClick={handleThemeChange} className={styles.action}>
          {theme === 'light' ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
          
          <VisuallyHidden>
            Toggle dark / light mode
          </VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
