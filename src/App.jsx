import { useState } from 'react'
import styles from './App.module.css'
import { Tile } from './components/Tile/Tile'
import { Button } from './components/Button/Button'
import * as app from './app'
import { shuffle } from './helpers/shuffle'

const number_of_tiles = 9

function App() {
  const [tiles, setTiles] = useState([])
  const [revealedUrl, setRevealedUrl] = useState("")
  const [matched, setMatched] = useState(0)


  function handleLoadNewGame() {
    setMatched(0)
    setRevealedUrl("")
    setTiles(shuffle(app.createDeck(number_of_tiles)))
  }

  function handlePlayedTiles(id) {
    const current_tile = tiles.filter(tile => tile.id === id)[0]
    if (!revealedUrl) {
      setTiles((prevTiles) => app.showTile(prevTiles, id))
      setRevealedUrl(current_tile.url)
    } else {
      if (revealedUrl !== current_tile.url) {
        setTiles((prevTiles) => app.showSecondTileUnmatched(prevTiles))
        setRevealedUrl("")
      } else {
        setTiles((prevTiles) => app.showSecondTileMatched(prevTiles, id))
        setRevealedUrl("")
        setMatched((prevMatched) => ++prevMatched)
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
                onClick={() => {handlePlayedTiles(id)}}
              />
          ))}
      </div>
      {
        matched < number_of_tiles
          ? <Button
            loadTilesOnClick={handleLoadNewGame}
            >{!tiles.length ? 'Load game' : 'Reset'}
            </Button>
          : <>
            <h2 className={styles.won}>YOU WIN !!!</h2>
            <Button
              loadTilesOnClick={handleLoadNewGame}
              >{!tiles.length ? 'Load game' : 'Reset'}
            </Button>
            </>
      }
    </>
  )
}

export default App
