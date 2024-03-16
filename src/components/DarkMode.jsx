import React from 'react';

class DarkMode extends React.Component {
  state = {
    isDarkMode: false,
  };

  toggleDarkMode = () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    this.setState({ isDarkMode });
  };

  render() {
    const { isDarkMode } = this.state;

    return (
      <button
        className={`toggle-dark-mode ${isDarkMode ? 'dark' : ''}`}
        onClick={this.toggleDarkMode}
      >
        {isDarkMode ? '🌞' : '🌙'}
      </button>
    );
  }
}

export default DarkMode;