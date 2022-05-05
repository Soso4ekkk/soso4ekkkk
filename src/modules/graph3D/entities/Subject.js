import Point from './Point';

class Subject {
    constructor(
        points = [],
        edges = [],
        polygons = [],
        animations = [],
        center = new Point(),
        R = 0,
        collisions = []
    ) {
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.animations = animations;
        this.center = center;
        this.R = R;
        this.collisions = collisions;
    }
}

export default Subject;