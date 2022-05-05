import Point from '../entities/Point';
import Polygon from '../entities/Polygon';
import Subject from '../entities/Subject';

function surprise(count = 20, h = 15, R = 15, r = 1) {
    const points = [];
    const edges = [];
    const polygons = [];

    const dt = 2 * Math.PI / count;

    /**************************торт**************************/
    for (let i = 0; i <= R; i += 5) {
        for (let j = 0; j < 2 * Math.PI; j += dt) {
            points.push(new Point(
                i * Math.cos(j), 
                5,
                Math.sin(j) * i
            ));
        }
    }

    for (let p = 0; p < h; p = p + 2) {
        for (let i = 0; i <= Math.PI; i += 2 * dt + count) {
            for (let j = 0; j < 2 * Math.PI; j += dt) {
                points.push(new Point(
                    R * Math.cos(j), 
                    (-1) * p,
                    R * Math.sin(j)
                ));
            }
        }
    }

    for (let i = 0; i <= R; i += 5) {
        for (let j = 0; j < 2 * Math.PI; j += dt) {
            points.push(new Point(
                i * Math.cos(j), 
                (-1) * h + 1,
                Math.sin(j) * i
            ));
        }
    }

    /********************************************************/

    /**************************свеча**************************/
    for (let p = 5; p < h; p = p + 1) {
        for (let i = 0; i <= Math.PI; i += 2 * dt + count) {
            for (let j = 0; j < 2 * Math.PI; j += dt) {
                points.push(new Point(
                    r * Math.cos(j), 
                    p,
                    r * Math.sin(j)
                ));
            }
        }
    }

    for (let p = h; p < h + 5; p = p + 5) {
        for (let i = 0; i <= Math.PI; i += 2 * dt + count) {
            for (let j = 0; j < 2 * Math.PI; j += dt) {
                points.push(new Point(
                    i * Math.cos(j),
                    p,
                    Math.sin(j) * i
                ));
            }
        }
    }

    /*********************************************************/

    //фитиль
    for (let i = 0; i <= 2 * Math.PI; i += dt) {
        for (let j = 0; j < 2 * Math.PI; j += dt) {
            points.push(new Point(
                1 * Math.sin(i) * Math.cos(j),
                h + 2 + 2 * Math.sin(i) * Math.sin(j),
                0
            ));
        }
    }

    /**************************************полигоны**************************************/
    for (let i = 0; i < points.length - 880; i++) {
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], '#ffefd5'));
        } else if (i + count < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], '#ffefd5'))
        }
    }

    for (let i = points.length - 880; i < points.length - 640; i++) {
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], '#deb887'));
        } else if (i + count < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], '#deb887'))
        }
    }

    for (let i = points.length - 640; i < points.length - 420; i++) {
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], '#87ceeb'));
        } else if (i + count < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], '#87ceeb'))
        }
    }

    for (let i = points.length - 420; i < points.length - 60; i++) {
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], 'yellow'));
        } else if (i + count < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], 'yellow'))
        }
    }

    for (let i = points.length - 60; i < points.length; i++) {
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], 'orange'));
        } else if (i + count < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], 'orange'))
        }
    }

    /************************************************************************************/

    return new Subject(points, edges, polygons);
}

export default surprise;