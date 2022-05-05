import Point from '../entities/Point';
import Edge from '../entities/Edge';
import Polygon from '../entities/Polygon';
import Subject from '../entities/Subject';

function cube(x = 0, y = 0, z = 0, size = 10) {

    //точки
    const points = [
        new Point(x - size, y - size, z - size),
        new Point(x - size, y - size, z + size),
        new Point(x + size, y - size, z + size),
        new Point(x + size, y - size, z - size),
        new Point(x - size, y + size, z - size),
        new Point(x - size, y + size, z + size),
        new Point(x + size, y + size, z + size),
        new Point(x + size, y + size, z - size)
    ];

    //ребра
    const edges = [
        new Edge(0, 1),
        new Edge(0, 3),
        new Edge(0, 4),
        new Edge(2, 1),
        new Edge(5, 1),
        new Edge(3, 2),
        new Edge(3, 7),
        new Edge(6, 7),
        new Edge(4, 7),
        new Edge(5, 6),
        new Edge(5, 4),
        new Edge(2, 6)
    ];

    //полигоны
    const polygons = [
        new Polygon([0, 1, 2, 3]),
        new Polygon([0, 4, 7, 3]),
        new Polygon([0, 4, 5, 1]),
        new Polygon([1, 2, 6, 5]),
        new Polygon([2, 3, 7, 6]),
        new Polygon([4, 5, 6, 7])
    ];
    
    return new Subject(points, edges, polygons);
}

export default cube;