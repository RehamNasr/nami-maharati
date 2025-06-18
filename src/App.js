import { useState } from 'react';
import './App.css';
import { HeaderComponent } from './Components/HeaderComponent';
import { AboutScreen, HomeScreen, PlayersScreen } from './Screens'
import { FooterComponent } from './Components/Footer';
function App() {
  const [appname, setappname] = useState("HomeScreen")
  const screens = {
    "HomeScreen": <HomeScreen />,
    "PlayersScreen": <PlayersScreen />,
    "AboutScreen": <AboutScreen />
  };

  return (
    <div className="App">

      <HeaderComponent appname={appname} setappname={setappname} />
      {screens[appname]}
      <FooterComponent />
    </div>
  );
}

export default App;
