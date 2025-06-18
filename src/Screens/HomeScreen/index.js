
import './styles.css'; 

const HomeScreen = ({ setappname }) => {
    const handleBrowseGamesClick = (event) => {
        event.preventDefault(); 
        if (setappname) {
            setappname("PlayersScreen");
        }
    };

    return (
        <div className="containeer">
            <div className="content-wrapper">
                <h2 className='headsec2'>نمي مهاراتي (for Kids) By Eman Eid</h2>
                <p className='des'>
                    نسهل عليكم مهمة اختيار الأفضل لأطفالكم! نقدم لكم مجموعة مختارة بعناية من ألعاب الأطفال
                    عالية الجودة، التي تلبي كافة المعايير الصحية ومعايير السلامة العالمية. سواء كنتم تبحثون
                    عن هدية مثالية، أو لعبة جديدة لمغامرة يومية، ستجدون هنا كل ما يسعد أطفالكم ويثري عالمهم،
                    مع ضمان راحتكم وثقتكم في اختياراتنا.
                </p>
                <a href="#" className='btn' onClick={handleBrowseGamesClick}>
                    تصفح الألعاب
                </a>
            </div>
        </div>
    );
}

export default HomeScreen;