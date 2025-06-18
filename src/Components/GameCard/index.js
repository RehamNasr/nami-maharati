import './styles.css'; 

export const GameCard = ({ game }) => {
    const { id, name, imageUrl, price, discount, available, type } = game;

    const finalPrice = discount ? (price * (1 - discount / 100)).toFixed(2) : price.toFixed(2);
    const hasDiscount = discount && discount > 0;

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
                <p className={`game-card-availability ${available ? 'available' : 'not-available'}`}>
                    {available ? 'متوفر فوراً' : 'غير متوفر حالياً'}
                </p>
                <button className="game-card-button">عرض التفاصيل</button>
            </div>
        </div>
    );
};