const fs = require('fs');

// Advent of Code 2022 - day 18

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    lava_surface_area(data)
    console.log("=======================")
    lava_surface_area_2(data)
});


function lava_surface_area(data) {
    const blocks = get3dBlocks(data);
    connectSides(blocks)
    let totalArea = 0;
    blocks.forEach(block => {
        if (block.sides.a === null)
            totalArea++;
        if (block.sides.b === null)
            totalArea++;
        if (block.sides.c === null)
            totalArea++;
        if (block.sides.d === null)
            totalArea++;
        if (block.sides.e === null)
            totalArea++;
        if (block.sides.f === null)
            totalArea++;
    })
    console.log(totalArea)
}






// Utils Functions


function get3dBlocks(data) {
    const blocks = []
    data.split("\n").filter(item => item).forEach((line, index) => {
        const regex = /(\d+),(\d+),(\d+)/g
        const result = regex.exec(line)
        const [_, x, y, z] = result
        blocks.push({
            type: "solid",
            id: index + 1,
            x: Number(x),
            y: Number(y),
            z: Number(z),
            sides: {
                a: null,
                b: null,
                c: null,
                d: null,
                e: null,
                f: null,
            }
        })

    })

    return blocks
}


function connectSides(blocks) {
    blocks.forEach(block => {
        const {x, y, z} = block;
        blocks.forEach(anotherBlock => {
            const {x: xb, y: yb, z: zb} = anotherBlock;
            if (x - xb === 1 && y === yb && z === zb) {
                block.sides.a = anotherBlock;
            }
            if (x - xb === -1 && y === yb && z === zb) {
                block.sides.b = anotherBlock;
            }
            if (x === xb && y - yb === 1 && z === zb) {
                block.sides.c = anotherBlock;
            }
            if (x === xb && y - yb === -1 && z === zb) {
                block.sides.d = anotherBlock;
            }
            if (x === xb && y === yb && z - zb === 1) {
                block.sides.e = anotherBlock;
            }
            if (x === xb && y === yb && z - zb === -1) {
                block.sides.f = anotherBlock;
            }
        })
    })
}

