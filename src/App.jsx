import Dropdown from './components/Dropdown';
import './app.scss';

const data = [
    {
        option: 'Adobe Photoshop',
        value: 'photoshop',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/512px-Adobe_Photoshop_CC_icon.svg.png',
        color: 'blue',
    },
    {
        option: 'Adobe Illustrator',
        value: 'illustrator',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Adobe_Illustrator_CC_icon.svg/512px-Adobe_Illustrator_CC_icon.svg.png',
    },
    {
        option: 'Adobe XD',
        value: 'xd',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Adobe_XD_CC_icon.svg/512px-Adobe_XD_CC_icon.svg.png',
    },
    {
        option: 'Adobe After Effects',
        value: 'aftereffects',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Adobe_After_Effects_CC_icon.svg/512px-Adobe_After_Effects_CC_icon.svg.png',
    },
    {
        option: 'Adobe Premier Pro',
        value: 'premier',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/512px-Adobe_Premiere_Pro_CC_icon.svg.png',
    },
];

const App = () => {
    return (
        <div className='app'>
            <h1>Dropdown React</h1>
            <div className='app__dropdown'>
                <Dropdown data={data} />
            </div>
        </div>
    );
};

export default App;
