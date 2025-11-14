document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const size = 4;
    const tiles = [];

    // initialize board
    for (let i = 0; i < size * size; i++) {
        const tile = document.createElement('div');
        tile.classList.add('Box');
        board.appendChild(tile);
        tiles.push(tile);
    }

    // add random tile
    function addRandomTile() {
        const emptyTiles = tiles.filter(tile => !tile.dataset.value);
        if (emptyTiles.length) {
            const tile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            tile.dataset.value = 2;
            tile.textContent = 2;
        }
    }

    addRandomTile();
    addRandomTile();

    // move function
    function move(getIndexSequence) {
        const mergedFlags = Array(size * size).fill(false);

        getIndexSequence().forEach(indices => {
            for (let i = 1; i < indices.length; i++) {
                let current = indices[i];
                if (!tiles[current].dataset.value) continue;

                let j = i - 1;
                while (j >= 0) {
                    const target = indices[j];
                    if (!tiles[target].dataset.value) {
                        tiles[target].dataset.value = tiles[current].dataset.value;
                        tiles[target].textContent = tiles[current].textContent;
                        tiles[current].dataset.value = '';
                        tiles[current].textContent = '';
                        current = target;
                    } else if (
                        tiles[target].dataset.value === tiles[current].dataset.value &&
                        !mergedFlags[target]
                    ) {
                        tiles[target].dataset.value *= 2;
                        tiles[target].textContent = tiles[target].dataset.value;
                        tiles[current].dataset.value = '';
                        tiles[current].textContent = '';
                        mergedFlags[target] = true;
                        break;
                    } else {
                        break;
                    }
                    j--;
                }
            }
        });
    }

    // generate index sequences for each direction
    
    function getUpSequences() {
        return Array.from({ length: size }, (_, col) =>
            Array.from({ length: size }, (_, row) => row * size + col)
        );
    }

    function getDownSequences() {
        return Array.from({ length: size }, (_, col) =>
            Array.from({ length: size }, (_, row) => (size - 1 - row) * size + col)
        );
    }

    function getLeftSequences() {
        return Array.from({ length: size }, (_, row) =>
            Array.from({ length: size }, (_, col) => row * size + col)
        );
    }

    function getRightSequences() {
        return Array.from({ length: size }, (_, row) =>
            Array.from({ length: size }, (_, col) => row * size + (size - 1 - col))
        );
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowUp') move(getUpSequences);
        else if (e.key === 'ArrowDown') move(getDownSequences);
        else if (e.key === 'ArrowLeft') move(getLeftSequences);
        else if (e.key === 'ArrowRight') move(getRightSequences);
        else return;

        addRandomTile();
    });
});
