const toolbarTitle = title => {
  const displayTitle = {
    File: `<span class="menu-hotkey">F</span>ile`,
    Edit: `<span class="menu-hotkey">E</span>dit`,
    View: `<span class="menu-hotkey">V</span>iew`,
    Favorites: `F<span class="menu-hotkey">a</span>vorites`,
    Tools: `<span class="menu-hotkey">T</span>ools`,
    Help: `<span class="menu-hotkey">H</span>elp`,
  };

  return displayTitle[title] || title;
};

export { toolbarTitle };
