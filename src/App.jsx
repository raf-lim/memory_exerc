import { useState } from 'react'
import styles from './App.module.css'
import { Tile } from './components/Tile'
import { Button } from './components/Button'
import { shuffle } from './libs/helpers/shuffle'

const number_of_tiles = 3

function App() {
  const [tiles, setTiles] = useState([])
  const [revealed, setRevealed] = useState([])
  const [matched, setMatched] = useState(0)

  function handleLoadNewGame() {
    setMatched([])
    setRevealed([])
    const img_idxs = Array.from({ length: number_of_tiles }, (_, idx) => idx + 1)
    const imgs_urls = img_idxs.map(idx => `/images/img${idx}.png`)
    const tiles_urls = imgs_urls.concat(imgs_urls)
    const tiles_objs = tiles_urls.map((url, idx) => (
      { 'id': idx, 'url': url, 'isRevealed': false, 'isMatched': false}
    ))
    return shuffle(tiles_objs)
  }

  function revealTile(id) {
    
    setTiles((prevTiles) => 
      prevTiles.map((tile) => {
          if (tile.id !== id) {
              return tile;
          }
          return { ...tile, isRevealed: true }
      })
    )
  }

  function handleRevealSecondTileUnmatched () {
    setTiles((prevTiles) => prevTiles.map((tile) => (
      !tile.isMatched ? { ...tile, isRevealed: false } : tile
    )))
  }

  function handleRevealSecondTileMatched(id) {
    setTiles((prevTiles) => prevTiles.map((tile) => {
      if (tile.id !== id && !tile.isRevealed) {
        return tile
      }
      else if (tile.id !== id && tile.isRevealed) {
        return { ...tile, isMatched: true}
      }
      return { ...tile, isMatched: true, isRevealed: true}
    }))
  }


  function handleRevealTiles(id) {
    revealTile(id)
    setRevealed(() => tiles.filter(tile => tile.id === id))
    if (revealed.length) {
      // if first tile revealed, compare urls of both revealed tiles.
      if (revealed[0].url === tiles.filter(tile => tile.id === id)[0].url) {
        handleRevealSecondTileMatched(id)
        setRevealed([])
        setMatched((prevMatched) => ++prevMatched)
      } else {
        setTimeout(() => handleRevealSecondTileUnmatched(), 500)
        setRevealed([])
      }
    }
  }

  return (
    <>
      <h1>Memory</h1>
      <div className={styles.board}>
          {tiles.map(({ id, url, isRevealed, isMatched}) => (
              <Tile
                key={id}
                img_url={url}
                isRevealed={isRevealed}
                isMatched={isMatched}
                onRevealClick={() => {handleRevealTiles(id)}}
              />
          ))}
      </div>
      {
        matched < number_of_tiles
          ? <Button
            loadTilesOnClick={() => setTiles(handleLoadNewGame())}
            >{!tiles.length ? 'Load game' : 'Reset'}
            </Button>
          : <>
            <h2 className={styles.won}>YOU WIN !!!</h2>
            <Button
              loadTilesOnClick={() => setTiles(handleLoadNewGame())}
              >{!tiles.length ? 'Load game' : 'Reset'}
            </Button>
            </>
      }
    </>
  )
}

export default App
