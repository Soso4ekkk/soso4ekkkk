import { useState } from 'react';

import Header from './components/header/Header';

import Calculator from './components/calculator/Calculator';
import Graph2D from './components/graph2D/Graph2D';
import Graph3D from './components/graph3D/Graph3D';

import window from './modules/graph2D/functions/functions';

import './App.css';

//для анимации
window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function App() {
    //точка старта
    const [activeButton, setActiveButton] = useState('graph3D');

    return (
        <div className="App">
            <Header
                key={activeButton}
                activeButton={activeButton}
                setActiveButton={(name) => setActiveButton(name)}
            ></Header>
            {/*переключалки между компонентами*/}
            {activeButton === 'calculator' ? <Calculator></Calculator> :
            activeButton === 'graph2D' ? <Graph2D></Graph2D> :
            activeButton === 'graph3D' ? <Graph3D></Graph3D> :
            ''}
            {/*********************************/}
        </div>
    );
}

export default App;
