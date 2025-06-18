import React, { useState, useMemo } from 'react';
import styles from './PlayersScreen.module.css'; // استخدام CSS Modules
import { GameCard } from '../../Components/GameCard';

// بيانات وهمية (Mock Data) للألعاب - لا تغيير هنا
const mockGames = [
    { id: '1', name: 'مكعبات البناء العملاقة', imageUrl: 'https://via.placeholder.com/280x200/A7D9FF/FFFFFF?text=Building+Blocks', price: 150.00, discount: 10, available: true, type: 'group' },
    { id: '2', name: 'لعبة الألغاز الخشبية', imageUrl: 'https://via.placeholder.com/280x200/FFFFB3/333333?text=Wooden+Puzzle', price: 80.00, discount: 0, available: true, type: 'single' },
    { id: '3', name: 'سيارة السباق بالتحكم عن بعد', imageUrl: 'https://via.placeholder.com/280x200/FF69B4/FFFFFF?text=RC+Car', price: 220.00, discount: 15, available: false, type: 'single' },
    { id: '4', name: 'طقم الطبيب الصغير', imageUrl: 'https://via.placeholder.com/280x200/98FB98/333333?text=Doctor+Kit', price: 100.00, discount: 0, available: true, type: 'group' },
    { id: '5', name: 'لعبة الصيد المغناطيسية', imageUrl: 'https://via.placeholder.com/280x200/E0E0E0/333333?text=Fishing+Game', price: 75.00, discount: 5, available: true, type: 'group' },
    { id: '6', name: 'بازل الحيوانات المزرعة', imageUrl: 'https://via.placeholder.com/280x200/F5F5DC/333333?text=Farm+Puzzle', price: 95.00, discount: 0, available: true, type: 'single' }
];


const PlayersScreen = () => {
    const [searchValue, setValueSearch] = useState("");
    const [filterValue, setValueFilter] = useState("all");

    const onclickFilter = (choice) => {
        setValueFilter(choice);
    };

    const handleSearchChange = (event) => {
        setValueSearch(event.target.value);
    };

    const filteredAndSearchedGames = useMemo(() => {
        let currentGames = mockGames;

        if (filterValue !== "all") {
            currentGames = currentGames.filter(game => game.type === filterValue);
        }

        if (searchValue) {
            const lowerCaseSearch = searchValue.toLowerCase();
            currentGames = currentGames.filter(game =>
                game.name.toLowerCase().includes(lowerCaseSearch)
            );
        }

        return currentGames;
    }, [filterValue, searchValue]);

    return (
        <div className={styles.playersScreenContainer}>
            <h1 className={styles.screenTitle}>قائمة الألعاب المتاحة</h1>

            <div className={styles.searchBarContainer}>
                <input
                    type="search"
                    className={styles.searchInput}
                    placeholder='ابحث عن اسم اللعبة...'
                    onChange={handleSearchChange}
                    value={searchValue}
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

            <div className={styles.gamesGridContainer}>
                {filteredAndSearchedGames.length > 0 ? (
                    filteredAndSearchedGames.map(game => (
                        <GameCard key={game.id} game={game} />
                    ))
                ) : (
                    <p className={styles.noResultsMessage}>لا توجد ألعاب مطابقة لمعايير البحث أو الفلتر.</p>
                )}
            </div>
        </div>
    );
};

export default PlayersScreen;