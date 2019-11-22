class Tank {
    constructor(id, orientation = Tank.orientation.TOP, status = 'alive', location = 'field') {
        this.id = id;
        this.orientation = orientation;
        this.status = status;
        this.location = location;
    }
};

Tank.orientation = {
    TOP: 1,
    RIGHT: 2,
    BOTTOM: 3,
    LEFT: 4
};
