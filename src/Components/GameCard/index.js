// Components/GameCard.js
import './styles.css';

export const GameCard = ({ game, onViewDetails, onAddToCart }) => { // Add onAddToCart prop
    const { id, name, imageUrl, price, discount, available, type, minAge, maxAge } = game;

    const finalPrice = discount ? (price * (1 - discount / 100)).toFixed(2) : price.toFixed(2);
    const hasDiscount = !!(discount && (discount > 0));
    return (
        <div className="game-card">
            <div className="game-card-image-container">
                <img src={imageUrl} alt={name} className="game-card-image" />
                {hasDiscount && <span className="game-card-discount-badge">-{discount}%</span>}
            </div>
            <div className="game-card-details">
                <h3 className="game-card-name">{name}</h3>
                <div className="game-card-price">
                    {hasDiscount && <span className="original-price">{price.toFixed(2)} جنيه</span>}
                    <span className="current-price">{finalPrice} جنيه</span>
                </div>
                {(minAge || maxAge) && (
                    <p className="game-card-age-range">
                        السن: {minAge}{maxAge ? ` - ${maxAge}` : ''} سنوات
                    </p>
                )}
                <p className={`game-card-availability ${available ? 'available' : 'not-available'}`}>
                    {available ? 'متوفر فوراً' : 'غير متوفر حالياً'}
                </p>
                <div className="game-card-actions"> {/* New container for buttons */}
                    <button className="game-card-button" onClick={() => onViewDetails(game)}>عرض التفاصيل</button>
                    {available && ( // Only show "Add to Cart" if available
                        <button
                            className="game-card-button add-to-cart-button" // Add a new class for styling
                            onClick={() => onAddToCart(game)}
                        >
                            أضف إلى العربة
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};