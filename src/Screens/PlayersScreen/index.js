import React, { useState, useEffect, useMemo } from 'react';
import styles from './PlayersScreen.module.css';
import { GameCard } from '../../Components/GameCard';
import { getProducts } from '../../services/productService';

const PlayersScreen = ({ onAddToCart }) => {
    const [games, setGames] = useState([]);
    const [searchValue, setValueSearch] = useState("");
    const [filterValue, setValueFilter] = useState("all");
    const [minAgeFilter, setMinAgeFilter] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadGames = async () => {
            try {
                setIsLoading(true);
                const gamesData = await getProducts();
                setGames(gamesData);
                setError(null);
            } catch (error) {
                console.error("Failed to load games", error);
                setError("حدث خطأ أثناء تحميل الألعاب. يرجى المحاولة لاحقاً.");
            } finally {
                setIsLoading(false);
            }
        };
        loadGames();
    }, []);

    const onclickFilter = (choice) => {
        setValueFilter(choice);
    };

    const handleSearchChange = (event) => {
        setValueSearch(event.target.value);
    };

    const handleMinAgeChange = (event) => {
        const value = event.target.value;
        if (value === '' || (!isNaN(value) && Number(value) >= 0)) {
            setMinAgeFilter(value);
        }
    };

    const openModal = (game) => {
        setSelectedGame(game);
        setIsModalOpen(true);
        setCurrentImageIndex(0);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedGame(null);
    };

    const nextImage = () => {
        if (selectedGame && selectedGame.additionalImages) {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % selectedGame.additionalImages.length
            );
        }
    };

    const prevImage = () => {
        if (selectedGame && selectedGame.additionalImages) {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex - 1 + selectedGame.additionalImages.length) % selectedGame.additionalImages.length
            );
        }
    };

    const filteredAndSearchedGames = useMemo(() => {
        let currentGames = games;
        
        if (filterValue !== "all") {
            currentGames = currentGames.filter(game => 
                game.isMultiplayer ? filterValue === "group" : filterValue === "single"
            );
        }

        if (searchValue) {
            const lowerCaseSearch = searchValue.toLowerCase();
            currentGames = currentGames.filter(game =>
                game.name.toLowerCase().includes(lowerCaseSearch)
            );
        }

        if (minAgeFilter !== "") {
            const minAge = Number(minAgeFilter);
            currentGames = currentGames.filter(game => 
                game.minAge && game.minAge >= minAge
            );
        }

        return currentGames;
    }, [games, filterValue, searchValue, minAgeFilter]);

    return (
        <div className={styles.playersScreenContainer}>
            <h1 className={styles.screenTitle}>قائمة الألعاب المتاحة</h1>

            {isLoading ? (
                <div className={styles.loadingContainer}>
                    <p>جاري تحميل الألعاب...</p>
                </div>
            ) : error ? (
                <div className={styles.errorContainer}>
                    <p>{error}</p>
                </div>
            ) : (
                <>
                    <div className={styles.controlsContainer}>
                        <div className={styles.searchBarContainer}>
                            <input
                                type="search"
                                className={styles.searchInput}
                                placeholder='ابحث عن اسم اللعبة...'
                                onChange={handleSearchChange}
                                value={searchValue}
                            />
                        </div>

                        <div className={styles.filterInputsContainer}>
                            <label htmlFor="minAge" className={styles.filterLabel}>الحد الأدنى للسن:</label>
                            <input
                                type="number"
                                id="minAge"
                                className={styles.ageInput}
                                placeholder='مثال: 5'
                                value={minAgeFilter}
                                onChange={handleMinAgeChange}
                                min="0"
                            />
                        </div>

                        <div className={styles.filterButtonsContainer}>
                            <button
                                className={`${styles.filterButton} ${filterValue === "all" ? styles.filterButtonSelect : ""}`}
                                onClick={() => onclickFilter("all")}
                            >
                                الكل
                            </button>
                            <button
                                className={`${styles.filterButton} ${filterValue === "single" ? styles.filterButtonSelect : ""}`}
                                onClick={() => onclickFilter("single")}
                            >
                                الألعاب الفردية
                            </button>
                            <button
                                className={`${styles.filterButton} ${filterValue === "group" ? styles.filterButtonSelect : ""}`}
                                onClick={() => onclickFilter("group")}
                            >
                                الألعاب الجماعية
                            </button>
                        </div>
                    </div>

                    <div className={styles.gamesGridContainer}>
                        {filteredAndSearchedGames.length > 0 ? (
                            filteredAndSearchedGames.map(game => (
                                <GameCard
                                    key={game.id}
                                    game={game}
                                    onViewDetails={openModal}
                                    onAddToCart={onAddToCart}
                                />
                            ))
                        ) : (
                            <p className={styles.noResultsMessage}>لا توجد ألعاب مطابقة لمعايير البحث أو الفلتر.</p>
                        )}
                    </div>

                    {isModalOpen && selectedGame && (
                        <div className={styles.modalOverlay} onClick={closeModal}>
                            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                                <button className={styles.closeButton} onClick={closeModal}>&times;</button>
                                <h2>{selectedGame.name}</h2>

                                {selectedGame.additionalImages && selectedGame.additionalImages.length > 0 && (
                                    <div className={styles.carouselContainer}>
                                        <img
                                            src={selectedGame.additionalImages[currentImageIndex]}
                                            alt={selectedGame.name}
                                            className={styles.modalImage}
                                        />
                                        {selectedGame.additionalImages.length > 1 && (
                                            <>
                                                <button className={`${styles.carouselButton} ${styles.prev}`} onClick={prevImage}>&#10094;</button>
                                                <button className={`${styles.carouselButton} ${styles.next}`} onClick={nextImage}>&#10095;</button>
                                            </>
                                        )}
                                    </div>
                                )}

                                <div className={styles.modalDetails}>
                                    <p><strong>النوع:</strong> {selectedGame.isMultiplayer ? 'جماعية' : 'فردية'}</p>
                                    <p><strong>السن المناسب:</strong> من {selectedGame.minAge} {selectedGame.maxAge ? `إلى ${selectedGame.maxAge}` : '+'} سنوات</p>
                                    <p><strong>السعر:</strong> {selectedGame.discount && selectedGame.discount > 0 ?
                                        (<><span className={styles.originalPriceModal}>{selectedGame.price.toFixed(2)}</span> {((selectedGame.price * (1 - selectedGame.discount / 100)).toFixed(2))} جنيه</>)
                                        : `${selectedGame.price.toFixed(2)} جنيه`
                                    }</p>
                                    <p><strong>التوفر:</strong> {selectedGame.available ? 'متوفر فوراً' : 'غير متوفر حالياً'}</p>

                                    {selectedGame.description && (
                                        <>
                                            <h3>الوصف:</h3>
                                            <p>{selectedGame.description}</p>
                                        </>
                                    )}
                                    {selectedGame.howToPlay && (
                                        <>
                                            <h3>طريقة اللعب:</h3>
                                            <p>{selectedGame.howToPlay}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PlayersScreen;