// Screens/CartScreen.js
import React from 'react';
import styles from './styles.module.css'; // Ensure correct path

const CartScreen = ({ cartItems, onUpdateQuantity, onRemoveFromCart, setappname }) => {
    // Target WhatsApp number
    const whatsappNumber = "01221315065";

    // Calculate total price
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const itemPrice = item.discount
                ? item.price * (1 - item.discount / 100)
                : item.price;
            return total + itemPrice * item.quantity;
        }, 0).toFixed(2);
    };

    // --- New handleCheckout function ---
    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("عربة التسوق فارغة، يرجى إضافة منتجات أولاً.");
            return;
        }

        // Build the invoice message
        let invoiceMessage = "فاتورة طلب من 'نمّي مهاراتي':\n\n";
        let itemCounter = 1;

        cartItems.forEach(item => {
            const itemPrice = item.discount
                ? item.price * (1 - item.discount / 100)
                : item.price;
            const lineTotal = (itemPrice * item.quantity).toFixed(2);

            invoiceMessage += `${itemCounter}. المنتج: ${item.name}\n`;
            invoiceMessage += `   الكمية: ${item.quantity}\n`;
            invoiceMessage += `   سعر الوحدة: ${itemPrice.toFixed(2)} جنيه\n`;
            invoiceMessage += `   الإجمالي للوحدة: ${lineTotal} جنيه\n\n`;
            itemCounter++;
        });

        invoiceMessage += `---------------------------------\n`;
        invoiceMessage += `الإجمالي الكلي للطلب: ${calculateTotal()} جنيه\n\n`;
        invoiceMessage += "شكرًا لطلبكم من 'نمّي مهاراتي'!";

        // URL-encode the message
        const encodedMessage = encodeURIComponent(invoiceMessage);

        // Construct the WhatsApp URL
        // Using wa.me for direct link
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Open WhatsApp in a new tab/window
        window.open(whatsappUrl, '_blank');

        // Optionally, clear the cart after initiating the order
        // You might want to ask for confirmation or move this to a success page
        // setCartItems([]); // Assuming setCartItems is passed down or accessed via context
        // setappname("HomeScreen"); // Redirect to home or a thank you page
    };
    // --- End handleCheckout function ---

    return (
        <div className={styles.cartScreenContainer}>
            <h1 className={styles.screenTitle}>عربة التسوق</h1>

            {cartItems.length === 0 ? (
                <div className={styles.emptyCart}>
                    <p>عربة التسوق فارغة.</p>
                    <button className={styles.continueShoppingBtn} onClick={() => setappname("PlayersScreen")}>
                        العودة للتسوق
                    </button>
                </div>
            ) : (
                <>
                    <div className={styles.cartItemsGrid}>
                        {cartItems.map(item => (
                            <div key={item.id} className={styles.cartItemCard}>
                                <img src={item.imageUrl} alt={item.name} className={styles.cartItemImage} />
                                <div className={styles.itemDetails}>
                                    <h3 className={styles.itemName}>{item.name}</h3>
                                    <p className={styles.itemPrice}>
                                        السعر: {item.discount
                                            ? (<><span className={styles.originalPriceCart}>{item.price.toFixed(2)}</span> {((item.price * (1 - item.discount / 100)).toFixed(2))} جنيه</>)
                                            : `${item.price.toFixed(2)} جنيه`
                                        }
                                    </p>
                                    <div className={styles.quantityControl}>
                                        <label htmlFor={`qty-${item.id}`}>الكمية:</label>
                                        <input
                                            type="number"
                                            id={`qty-${item.id}`}
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                                            className={styles.quantityInput}
                                        />
                                    </div>
                                    <button
                                        className={styles.removeButton}
                                        onClick={() => onRemoveFromCart(item.id)}
                                    >
                                        إزالة
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.cartSummary}>
                        <p className={styles.totalPrice}>الإجمالي: <span>{calculateTotal()} جنيه</span></p>
                        {/* Attach handleCheckout to the checkout button */}
                        <button className={styles.checkoutButton} onClick={handleCheckout}>إتمام الشراء</button>
                        <button className={styles.continueShoppingBtn} onClick={() => setappname("PlayersScreen")}>
                            متابعة التسوق
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartScreen;