export function createDeck(number_of_tiles) {
  const img_idxs = Array.from({ length: number_of_tiles }, (_, idx) => idx + 1);
  const imgs_urls = img_idxs.map((idx) => `/images/img${idx}.png`);
  const tiles_urls = imgs_urls.concat(imgs_urls);
  return tiles_urls.map((url, idx) => ({
    id: idx,
    url: url,
    isRevealed: false,
    isMatched: false,
  }));
}

export function showTile(tiles, id) {
  return tiles.map((tile) =>
    tile.id !== id ? tile : { ...tile, isRevealed: true }
  );
}

export function showSecondTileUnmatched(tiles) {
  return tiles.map((tile) =>
    !tile.isMatched ? { ...tile, isRevealed: false } : tile
  );
}

export function showSecondTileMatched(tiles, id) {
  return tiles.map((tile) => {
    if (tile.id !== id && !tile.isRevealed) {
      return tile;
    } else if (tile.id !== id && tile.isRevealed) {
      return { ...tile, isMatched: true };
    }
    return { ...tile, isMatched: true, isRevealed: true };
  });
}
