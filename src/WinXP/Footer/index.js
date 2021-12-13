import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import FooterMenu from './FooterMenu';
import Balloon from 'components/Balloon';
import startIcon from 'assets/windowsIcons/start-icon.png';
import sound from 'assets/windowsIcons/690(16x16).png';
import usb from 'assets/windowsIcons/394(16x16).png';
import risk from 'assets/windowsIcons/229(16x16).png';

const getTime = () => {
  const date = new Date();
  let hour = date.getHours();
  let hourPostFix = 'AM';
  let min = date.getMinutes();
  if (hour >= 12) {
    hour -= 12;
    hourPostFix = 'PM';
  }
  if (hour === 0) {
    hour = 12;
  }
  if (min < 10) {
    min = '0' + min;
  }
  return `${hour}:${min} ${hourPostFix}`;
};

function Footer({
  onMouseDownApp,
  apps,
  focusedAppId,
  onMouseDown,
  onClickMenuItem,
}) {
  const [time, setTime] = useState(getTime);
  const [menuOn, setMenuOn] = useState(false);
  const menu = useRef(null);
  function toggleMenu() {
    setMenuOn(on => !on);
  }
  function _onMouseDown(e) {
    if (e.target.closest('.footer__window')) return;
    onMouseDown();
  }
  function _onClickMenuItem(name) {
    onClickMenuItem(name);
    setMenuOn(false);
  }
  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = getTime();
      newTime !== time && setTime(newTime);
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);
  useEffect(() => {
    const target = menu.current;
    if (!target) return;
    function onMouseDown(e) {
      if (!target.contains(e.target) && menuOn) setMenuOn(false);
    }
    window.addEventListener('mousedown', onMouseDown);
    return () => window.removeEventListener('mousedown', onMouseDown);
  }, [menuOn]);

  return (
    <Container onMouseDown={_onMouseDown}>
      <div className="footer__items left">
        <div ref={menu} className="footer__start__menu">
          {menuOn && <FooterMenu onClick={_onClickMenuItem} />}
        </div>
        {/* <img
          src={startButton}
          alt="start"
          className="footer__start"
          onMouseDown={toggleMenu}
        /> */}
        <button className="start" onMouseDown={toggleMenu}>
          <img src={startIcon} alt="start" />
          <span>Start</span>
        </button>
        <div className="separator" />
        {[...apps].map(
          app =>
            !app.header.noFooterWindow && (
              <FooterWindow
                key={app.id}
                id={app.id}
                icon={app.header.icon}
                title={app.header.title}
                onMouseDown={onMouseDownApp}
                isFocus={focusedAppId === app.id}
              />
            ),
        )}
      </div>

      <div className="footer__items right">
        <img className="footer__icon" src={sound} alt="" />
        <img className="footer__icon" src={usb} alt="" />
        <img className="footer__icon" src={risk} alt="" />
        <div style={{ position: 'relative', width: 0, height: 0 }}>
          <Balloon />
        </div>
        <div className="footer__time">{time}</div>
      </div>
    </Container>
  );
}

function FooterWindow({ id, icon, title, onMouseDown, isFocus }) {
  function _onMouseDown() {
    onMouseDown(id);
  }
  return (
    <div
      onMouseDown={_onMouseDown}
      className={`footer__window ${isFocus ? 'focus' : 'cover'}`}
    >
      <img className="footer__icon" src={icon} alt={title} />
      <div className="footer__text">{title}</div>
    </div>
  );
}

const Container = styled.footer`
  height: 28px;
  padding: 2px 2px 2px 0;
  background: rgb(192, 192, 192);
  border-top: 1px solid #fff;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  .footer__items.left {
    height: 100%;
    flex: 1;
    overflow: hidden;
  }
  .footer__items.right {
    border-style: solid;
    border-width: 1px;
    border-color: rgb(128, 128, 128) rgb(255, 255, 255) rgb(255, 255, 255)
      rgb(128, 128, 128);
    padding: 0 10px;
    margin-left: 10px;
  }
  .footer__items {
    display: flex;
    align-items: center;
  }
  .footer__start {
    height: 100%;
    margin-right: 10px;
    position: relative;
    &:hover {
      filter: brightness(105%);
    }
    &:active {
      pointer-events: none;
      filter: brightness(85%);
    }
  }
  .footer__start__menu {
    position: absolute;
    left: 0;
    box-shadow: 2px 4px 2px rgba(0, 0, 0, 0.5);
    bottom: 100%;
  }
  .footer__window {
    flex: 1;
    max-width: 200px;
    margin-right: 4px;
    color: #fff;
    padding: 0 8px;
    height: 100%;
    font-size: 12px;
    position: relative;
    display: flex;
    align-items: center;

    background: rgb(192, 192, 192);
    box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff,
      inset -2px -2px grey, inset 2px 2px #dfdfdf;
    border-radius: 0;
    color: #212121;
  }
  .footer__icon {
    height: 15px;
    width: 15px;
  }
  .footer__text {
    position: absolute;
    left: 27px;
    right: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .footer__window.cover:before {
    display: block;
    content: '';
    position: absolute;
    left: -2px;
    top: -2px;
    width: 10px;
    height: 1px;
    border-bottom-right-radius: 50%;
    box-shadow: 2px 2px 3px rgba(255, 255, 255, 0.5);
  }

  .footer__window.focus {
    min-width: 200px;
    height: 100%;
    box-shadow: none;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAG0lEQVQYV2P8/////4MHDzIwHjhw4L+9vT0DAHAFCj6esq3FAAAAAElFTkSuQmCC)
      repeat;
    color: #212121;
    font-weight: bold;
    border: 2px solid rgb(128, 128, 128);
    border-bottom-color: #fff;
    border-right-color: #fff;
    margin: 0;
    :before {
      content: '';
      display: block;
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border: 1px solid #212121;
      border-right-color: #fff;
      border-bottom-color: #fff;
    }
  }
  .footer__time {
    margin: 0 5px;
    color: #212121;
    font-size: 11px;
    font-weight: lighter;
    text-shadow: none;
  }

  .separator {
    border: none;
    box-shadow: inset -1px -1px #fff, inset -2px 1px grey, inset 1px -2px grey,
      inset 2px 2px #fff;
    margin: 0;
    margin: 0 3px;
    padding: 1px;
    height: 100%;
  }

  .start {
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      margin-left: 3px;
    }
  }
`;

export default Footer;
