import React, { useRef, useEffect } from 'react';
import reactDom from 'react-dom';

import './style.less';
import Tank from './tank';
import Bullet from './bullet';
import { getShootingDirection } from './tools';

const KEY_MAPPING = {
    37: 'LEFT',
    38: 'UP',
    39: 'RIGHT',
    40: 'DOWN'
}

function App() {
    const canvas = useRef(null);

    useEffect(() => {

        const ctx = canvas.current.getContext('2d');
        const tank = new Tank(100, 100, 'RIGHT', ctx);

        ctx.fillRect(200, 200, 20, 20);

        const hanlder = evt => {
            if (evt.keyCode === 13) {
                const { headerX, headerY, direction } = tank;
                const bullet = new Bullet(...getShootingDirection(headerX, headerY, direction, 5), direction, ctx);
                bullet.move();
            }

            const direction = KEY_MAPPING[evt.keyCode];
            if (direction) {
                tank.changeDirection(direction);
                tank.move(10);
            }
        }

        document.addEventListener('keydown', hanlder)

        tank.drow();

        return () => {
            document.removeEventListener('keydowm', hanlder);
        }

    }, [])
    return <canvas className='container' ref={canvas} width="800" height="500"/>
}

reactDom.render(<App />, document.querySelector('#app'))