import React, { useState } from 'react';
import { HeaderComponent } from './Components/HeaderComponent';
import { FooterComponent } from './Components/Footer';
import HomeScreen from './Screens/HomeScreen';
import PlayersScreen from './Screens/PlayersScreen';
import CartScreen from './Screens/CartScreen';
import AboutScreen from './Screens/AboutScreen';

import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState("HomeScreen");
  const [cartItems, setCartItems] = useState([]);
  const [toastMessage, setToastMessage] = useState(''); // New state for toast message
  const [showToast, setShowToast] = useState(false);   // New state for toast visibility

  const handleSetAppName = (screenName) => {
    setCurrentScreen(screenName);
  };

  // --- Cart Actions ---
  const handleAddToCart = (gameToAdd) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === gameToAdd.id);
      if (existingItem) {
        // If item already in cart, update quantity
        const updatedItems = prevItems.map(item =>
          item.id === gameToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        showToastNotification(`تمت زيادة كمية "${gameToAdd.name}" في العربة!`); // Toast message for increased quantity
        return updatedItems;
      } else {
        // If new item, add with quantity 1
        const newItems = [...prevItems, { ...gameToAdd, quantity: 1 }];
        showToastNotification(`تمت إضافة "${gameToAdd.name}" إلى العربة بنجاح!`); // Toast message for new item
        return newItems;
      }
    });
  };

  const handleUpdateQuantity = (gameId, newQuantity) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        // Remove item if quantity is 0 or less
        const removedItem = prevItems.find(item => item.id === gameId);
        showToastNotification(`تمت إزالة "${removedItem.name}" من العربة.`); // Toast message for removal
        return prevItems.filter(item => item.id !== gameId);
      }
      return prevItems.map(item =>
        item.id === gameId
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  };

  const handleRemoveFromCart = (gameId) => {
    setCartItems(prevItems => {
      const removedItem = prevItems.find(item => item.id === gameId);
      showToastNotification(`تمت إزالة "${removedItem.name}" من العربة.`); // Toast message for removal
      return prevItems.filter(item => item.id !== gameId);
    });
  };
  // --- End Cart Actions ---

  // --- Toast Notification Logic ---
  const showToastNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
      setToastMessage(''); // Clear message after hiding
    }, 3000);
  };
  // --- End Toast Notification Logic ---

  return (
    <div className="App">
      <HeaderComponent
        appname={currentScreen}
        setappname={handleSetAppName}
        cartItemCount={cartItems.length}
      />

      {currentScreen === "HomeScreen" && <HomeScreen setappname={handleSetAppName} />}
      {currentScreen === "PlayersScreen" && (
        <PlayersScreen
          setappname={handleSetAppName}
          onAddToCart={handleAddToCart}
        />
      )}
      {currentScreen === "AboutScreen" && <AboutScreen />} {/* <--- 2. Add conditional rendering for AboutScreen */}

      {currentScreen === "CartScreen" && (
        <CartScreen
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveFromCart={handleRemoveFromCart}
          setappname={handleSetAppName}
        />
      )}
      <FooterComponent />

      {/* Toast Notification Element */}
      {showToast && (
        <div className="toast-notification">
          {toastMessage}
        </div>
      )}
    </div>
    
  );
}

export default App;