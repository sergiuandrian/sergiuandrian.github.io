$(document).ready(function () {
    render();


    $(document).keydown(function (event) {
        let tank;
        let tank2;
        let newOrientation;
        switch (event.which) {
            case 65:
                newOrientation = Tank.orientation.LEFT;
                tank = getTankById(1);
                break;
            case 87:
                newOrientation = Tank.orientation.TOP;
                tank = getTankById(1);
                break;
            case 68:
                newOrientation = Tank.orientation.RIGHT;
                tank = getTankById(1);
                break;
            case 83:
                newOrientation = Tank.orientation.BOTTOM;
                tank = getTankById(1);
                break;
            case 37:
                newOrientation = Tank.orientation.LEFT;
                tank2 = getTankById(2);
                break;
            case 38:
                newOrientation = Tank.orientation.TOP;
                tank2 = getTankById(2);
                break;
            case 39:
                newOrientation = Tank.orientation.RIGHT;
                tank2 = getTankById(2);
                break;
            case 40:
                newOrientation = Tank.orientation.BOTTOM;
                tank2 = getTankById(2);
                break;
        }

        if (tank) {
            tank.orientation = newOrientation;
            moveTank(1, tank.orientation);
            render();
        }
        else if (tank2) {
            tank2.orientation = newOrientation;
            moveTank(2, tank2.orientation);
            render();
        }
    });

    $(document).keydown(function (event) {
        if (event.keyCode == 20) {
            $('.bullet').css('top', '-100px');
        }
    });

});

function drawTerrain() {
    var table = $('<table/>').addClass('table');
    var tbody = $('<tbody/>');
    table.append(tbody);

    for (var i = 0; i < map.length; i++) {
        var tr = $('<tr/>');
        tbody.append(tr);
        for (var j = 0; j < map[i].length; j++) {
            var td = $('<td/>');
            switch (map[i][j]) {
                case 0: td.addClass('battle-field');
                    break;
                case 1: td.addClass('brick');
                    break;
                case 2: td.addClass('water');
                    break;
                case 3: td.addClass('stone');
                    break;
                case 4: td.addClass('rank');
                default:
            }
            tr.append(td);
        }
    }
    $('#container')
        .empty()
        .append(table);
}

function getTankById(tankId) {
    return tanks[tankId];
}

function renderTank(tank) {
    return $('<div />')
        .addClass('tank')
        .addClass(`tank-${tank.id}`)
        .addClass(`orientation-${tank.orientation}`)
        .append($('<div/>').addClass('bullet'));
}

function drawObjects() {
    for (let i = 0; i < objects.length; i++) {
        for (let j = 0; j < objects[i].length; j++) {
            if (objects[i][j] != 0) {
                let tank = getTankById(objects[i][j]);
                let tankHtml = renderTank(tank);
                let $row = $($('.table tr')[i]);
                let $column = $($row.find('td')[j]);
                $column.append(tankHtml);
            }
        }
    }
}

function moveTank(tankId, direction) {
    for (let i = 0; i < objects.length; i++) {
        for (let j = 0; j < objects[i].length; j++) {
            if (objects[i][j] == tankId) {
                let targetI = i;
                let targetJ = j;

                switch (direction) {
                    case Tank.orientation.TOP:
                        targetI = i - 1;
                        break;
                    case Tank.orientation.RIGHT:
                        targetJ = j + 1;
                        break;
                    case Tank.orientation.BOTTOM:
                        targetI = i + 1;
                        break;
                    case Tank.orientation.LEFT:
                        targetJ = j - 1;
                        break;
                }

                if (
                    // new coordinates are inside the map
                    targetI < objects.length && targetJ < objects[i].length
                    // the terrain under new coordinates is traversable (not a rock, water etc.)
                    && isTerrainTraversable(targetI, targetJ)
                    // there're no objects under new coordinates
                    && objects[targetI][targetJ] == 0
                ) {
                    objects[targetI][targetJ] = tankId;
                    objects[i][j] = 0;
                }
                return;
            }
        }
    }
}
function isTerrainTraversable(i, j) {
    if (map[i][j] == 0) {
        return true;
    }
    else {
        return false;
    }
}
function render() {
    drawTerrain();
    drawObjects();
}
