// PlayersScreen.js
import React, { useState, useMemo } from 'react';
import styles from './PlayersScreen.module.css'; // استخدام CSS Modules
import { GameCard } from '../../Components/GameCard'; // تأكد من المسار الصحيح

// --- Mock Data (Updated to include more realistic image URLs) ---
const mockGames = [
    {
        id: '1',
        name: 'مكعبات البناء العملاقة',
        // Unsplash image for building blocks
        imageUrl: 'https://plus.unsplash.com/premium_photo-1702498664804-f9c3b5c718f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        images: [
            'https://plus.unsplash.com/premium_photo-1702498664804-f9c3b5c718f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1701984401817-a6dfdb9db8b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1702498664802-c7a1ad1afcac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        price: 150.00,
        discount: 10,
        available: true,
        type: 'group',
        minAge: 6,
        maxAge: 12,
        description: 'مجموعة رائعة من مكعبات البناء الكبيرة والمتينة التي تشجع على الإبداع والهندسة الصغيرة. مثالية لتطوير المهارات الحركية الدقيقة والتفكير المكاني.',
        howToPlay: 'استخدم المكعبات لإنشاء هياكل مختلفة، يمكن اللعب بشكل فردي أو جماعي لبناء مدن وقلاع. لا توجد قواعد صارمة، دع خيالك يقودك!'
    },
    {
        id: '2',
        name: 'لعبة الألغاز الخشبية',
        // Unsplash image for wooden puzzle
        imageUrl: 'https://plus.unsplash.com/premium_photo-1702498664804-f9c3b5c718f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        images: [
            'https://plus.unsplash.com/premium_photo-1702498664804-f9c3b5c718f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1701984401817-a6dfdb9db8b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1702498664802-c7a1ad1afcac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        price: 80.00,
        discount: 0,
        available: true,
        type: 'single',
        minAge: 4,
        maxAge: 8,
        description: 'أحاجي خشبية عالية الجودة برسومات حيوانات زاهية. تساعد على تحسين مهارات حل المشكلات والتعرف على الأشكال والألوان.',
        howToPlay: 'قم بتجميع القطع الخشبية لتشكيل الصورة الكاملة. ابدأ بالقطع الحواف ثم انتقل إلى الوسط. يمكن تحدي نفسك بتوقيت إكمال اللغز.'
    },
    {
        id: '3',
        name: 'سيارة السباق بالتحكم عن بعد',
        // Unsplash image for RC car
        imageUrl: 'https://plus.unsplash.com/premium_photo-1702498664804-f9c3b5c718f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        images: [
            'https://plus.unsplash.com/premium_photo-1702498664804-f9c3b5c718f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1701984401817-a6dfdb9db8b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1702498664802-c7a1ad1afcac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        price: 220.00,
        discount: 15,
        available: false,
        type: 'single',
        minAge: 8,
        maxAge: 16,
        description: 'سيارة سباق سريعة ومتينة تعمل بالتحكم عن بعد، مثالية للسباقات الداخلية والخارجية. تتميز ببطارية تدوم طويلاً وتحكم دقيق.',
        howToPlay: 'استخدم جهاز التحكم عن بعد لتوجيه السيارة للأمام، الخلف، اليمين، واليسار. قم بتنظيم سباقات مع الأصدقاء أو تحدى نفسك في مسارات العقبات.'
    },
    {
        id: '4',
        name: 'طقم الطبيب الصغير',
        // Unsplash image for toy doctor kit
        imageUrl: 'https://plus.unsplash.com/premium_photo-1702498664804-f9c3b5c718f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        images: [
            'https://plus.unsplash.com/premium_photo-1702498664804-f9c3b5c718f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1701984401817-a6dfdb9db8b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1702498664802-c7a1ad1afcac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        price: 100.00,
        discount: 0,
        available: true,
        type: 'group',
        minAge: 3,
        maxAge: 7,
        description: 'مجموعة أدوات طبيب واقعية للأطفال، تشجع على اللعب التخيلي وتطوير المهارات الاجتماعية والعاطفية. آمنة ومناسبة للأيدي الصغيرة.',
        howToPlay: 'يمكن للأطفال استخدام الأدوات لفحص المرضى (دمى، حيوانات محشوة، أو حتى أفراد العائلة!). تعلم أسماء الأدوات ووظائفها أثناء اللعب.'
    },
    {
        id: '5',
        name: 'لعبة الصيد المغناطيسية',
        // Unsplash image for magnetic fishing game
        imageUrl: 'https://plus.unsplash.com/premium_photo-1702498664804-f9c3b5c718f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        images: [
            'https://plus.unsplash.com/premium_photo-1702498664804-f9c3b5c718f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1701984401817-a6dfdb9db8b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1702498664802-c7a1ad1afcac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        price: 75.00,
        discount: 5,
        available: true,
        type: 'group',
        minAge: 2,
        maxAge: 5,
        description: 'لعبة صيد ممتعة وملونة مع قضبان صيد مغناطيسية وأسماك صغيرة. تساعد على تطوير التنسيق بين اليد والعين والمهارات الحركية الدقيقة.',
        howToPlay: 'استخدم قضيب الصيد لربط المغناطيس بالأسماك العائمة. يمكن اللعب بشكل فردي أو جماعي، وتحدي من يصطاد أكبر عدد من الأسماك.'
    },
    {
        id: '6',
        name: 'بازل الحيوانات المزرعة',
        // Unsplash image for farm animal puzzle
        imageUrl: 'https://plus.unsplash.com/premium_photo-1702498664804-f9c3b5c718f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        images: [
            'https://plus.unsplash.com/premium_photo-1702498664804-f9c3b5c718f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1701984401817-a6dfdb9db8b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1702498664802-c7a1ad1afcac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        price: 95.00,
        discount: 0,
        available: true,
        type: 'single',
        minAge: 3,
        maxAge: 6,
        description: 'بازل خشبي كبير يضم حيوانات المزرعة المحببة. مثالي لتعريف الأطفال بأسماء الحيوانات وأصواتها، ويساعد في تطوير المهارات المعرفية.',
        howToPlay: 'ضع قطع البازل في أماكنها الصحيحة لتكوين صورة المزرعة. شجع الطفل على تسمية الحيوانات ومحاكاة أصواتها.'
    },
    {
        id: '7',
        name: 'قطار الأبجدية التعليمي',
        imageUrl: 'https://plus.unsplash.com/premium_photo-1702498664804-f9c3b5c718f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        images: [
            'https://plus.unsplash.com/premium_photo-1702498664804-f9c3b5c718f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1701984401817-a6dfdb9db8b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1702498664802-c7a1ad1afcac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        price: 180.00,
        discount: 10,
        available: true,
        type: 'single',
        minAge: 3,
        maxAge: 6,
        description: 'قطار خشبي ملون يحمل مكعبات الحروف الأبجدية، يساعد الأطفال على تعلم الحروف والكلمات الأولى بطريقة ممتعة وتفاعلية.',
        howToPlay: 'قم بترتيب مكعبات الحروف لتكوين كلمات، أو استخدم القطار لنقل الحروف في مغامرات تخيلية. يمكن أن يتدرب الطفل على نطق الحروف مع كل قطعة.'
    },
    {
        id: '8',
        name: 'لعبة مطبخ الشيف الصغير',
        imageUrl: 'https://plus.unsplash.com/premium_photo-1702498664804-f9c3b5c718f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        images: [
            'https://plus.unsplash.com/premium_photo-1702498664804-f9c3b5c718f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1701984401817-a6dfdb9db8b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1702498664802-c7a1ad1afcac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        price: 350.00,
        discount: 20,
        available: true,
        type: 'group',
        minAge: 4,
        maxAge: 10,
        description: 'مطبخ ألعاب متكامل مع أواني وأدوات طهي بلاستيكية آمنة، يشجع على لعب الأدوار وتنمية المهارات الاجتماعية والإبداعية.',
        howToPlay: 'يمكن للأطفال التظاهر بالطهي وتقديم الوجبات لأصدقائهم أو دمىهم. يمكنهم ابتكار وصفاتهم الخاصة أو محاكاة الطهاة الحقيقيين.'
    },
    {
        id: '9',
        name: 'مجموعة الرسم والتلوين',
        imageUrl: 'https://plus.unsplash.com/premium_photo-1702498664804-f9c3b5c718f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        images: [
            'https://plus.unsplash.com/premium_photo-1702498664804-f9c3b5c718f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1701984401817-a6dfdb9db8b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1702498664802-c7a1ad1afcac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        price: 120.00,
        discount: 0,
        available: true,
        type: 'single',
        minAge: 5,
        maxAge: 12,
        description: 'مجموعة فنية شاملة تحتوي على أقلام تلوين، ألوان مائية، فرش، ودفاتر رسم. مثالية لتنمية المهارات الفنية والإبداع لدى الأطفال.',
        howToPlay: 'استخدم الأدوات للتعبير عن إبداعك من خلال الرسم والتلوين. جرب تقنيات مختلفة وامزج الألوان لإنشاء لوحات فريدة.'
    },
    {
        id: '10',
        name: 'لعبة بناء برج التوازن',
        imageUrl: 'https://plus.unsplash.com/premium_photo-1702498664804-f9c3b5c718f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        images: [
            'https://plus.unsplash.com/premium_photo-1702498664804-f9c3b5c718f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1701984401817-a6dfdb9db8b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1702498664802-c7a1ad1afcac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        price: 85.00,
        discount: 0,
        available: true,
        type: 'group',
        minAge: 6,
        maxAge: 10,
        description: 'لعبة مهارة وتحدي تتطلب بناء برج عالٍ باستخدام قطع خشبية مع المحافظة على توازنه، تساعد على تطوير التركيز والدقة.',
        howToPlay: 'بالتناوب، يقوم كل لاعب بسحب قطعة واحدة من البرج ثم يضعها في الأعلى دون أن يسقط البرج. اللاعب الذي يسقط البرج يخسر.'
    }
];
// --- End Mock Data ---


// Change this line to accept the onAddToCart prop
const PlayersScreen = ({ onAddToCart }) => {
    const [searchValue, setValueSearch] = useState("");
    const [filterValue, setValueFilter] = useState("all");
    const [minAgeFilter, setMinAgeFilter] = useState(""); // New state for min age filter

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // For carousel

    const onclickFilter = (choice) => {
        setValueFilter(choice);
    };

    const handleSearchChange = (event) => {
        setValueSearch(event.target.value);
    };

    // New handler for min age filter
    const handleMinAgeChange = (event) => {
        const value = event.target.value;
        // Allow empty string or numbers
        if (value === '' || (!isNaN(value) && Number(value) >= 0)) {
            setMinAgeFilter(value);
        }
    };

    // --- Modal Handlers ---
    const openModal = (game) => {
        setSelectedGame(game);
        setIsModalOpen(true);
        setCurrentImageIndex(0); // Reset carousel to first image when opening
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedGame(null);
    };

    const nextImage = () => {
        if (selectedGame && selectedGame.images) {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % selectedGame.images.length
            );
        }
    };

    const prevImage = () => {
        if (selectedGame && selectedGame.images) {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex - 1 + selectedGame.images.length) % selectedGame.images.length
            );
        }
    };
    // --- End Modal Handlers ---


    const filteredAndSearchedGames = useMemo(() => {
        let currentGames = mockGames;
        console.log("Initial Games:", currentGames.length); //

        // Apply type filter
        if (filterValue !== "all") {
            currentGames = currentGames.filter(game => game.type === filterValue);
            console.log("After Type Filter:", currentGames.length); //
        }

        // Apply search filter
        if (searchValue) {
            const lowerCaseSearch = searchValue.toLowerCase();
            currentGames = currentGames.filter(game =>
                game.name.toLowerCase().includes(lowerCaseSearch)
            );
            console.log("After Search Filter:", currentGames.length); //
        }

        // Apply minimum age filter
        if (minAgeFilter !== "") {
            const minAge = Number(minAgeFilter);
            currentGames = currentGames.filter(game => {
                const isIncluded = game.minAge && game.minAge >= minAge;
                console.log(`Game: ${game.name}, Min Age: ${game.minAge}, Filter: ${minAge}, Included: ${isIncluded}`); //
                return isIncluded;
            });
            console.log("After Min Age Filter:", currentGames.length); //
        }

        return currentGames;
    }, [filterValue, searchValue, minAgeFilter]); //
    return (
        <div className={styles.playersScreenContainer}>
            <h1 className={styles.screenTitle}>قائمة الألعاب المتاحة</h1>

            <div className={styles.controlsContainer}> {/* New container for search and filters */}
                <div className={styles.searchBarContainer}>
                    <input
                        type="search"
                        className={styles.searchInput}
                        placeholder='ابحث عن اسم اللعبة...'
                        onChange={handleSearchChange}
                        value={searchValue}
                    />
                </div>

                <div className={styles.filterInputsContainer}> {/* Container for age filter */}
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
                            onViewDetails={openModal} // Pass the openModal function
                            onAddToCart={onAddToCart} // Make sure this is passed down
                        />
                    ))
                ) : (
                    <p className={styles.noResultsMessage}>لا توجد ألعاب مطابقة لمعايير البحث أو الفلتر.</p>
                )}
            </div>

            {/* --- Game Details Modal --- */}
            {isModalOpen && selectedGame && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={closeModal}>&times;</button>
                        <h2>{selectedGame.name}</h2>

                        {/* Image Carousel */}
                        {selectedGame.images && selectedGame.images.length > 0 && (
                            <div className={styles.carouselContainer}>
                                <img
                                    src={selectedGame.images[currentImageIndex]}
                                    alt={selectedGame.name}
                                    className={styles.modalImage}
                                />
                                {selectedGame.images.length > 1 && (
                                    <>
                                        <button className={`${styles.carouselButton} ${styles.prev}`} onClick={prevImage}>&#10094;</button>
                                        <button className={`${styles.carouselButton} ${styles.next}`} onClick={nextImage}>&#10095;</button>
                                    </>
                                )}
                            </div>
                        )}

                        <div className={styles.modalDetails}>
                            <p><strong>النوع:</strong> {selectedGame.type === 'single' ? 'فردية' : 'جماعية'}</p>
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
        </div>
    );
};

export default PlayersScreen;