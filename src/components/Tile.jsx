import styles from './Tile.module.css'

export function Tile({ img_url, isRevealed, onRevealClick }) {

    return (
        <div 
            className={
                !isRevealed 
                    ? styles.tile
                    : `${styles.tile} ${styles.revealed}`
            }
            style={isRevealed ? { backgroundImage: `url(${img_url})` } : null}
            onClick={onRevealClick}
        >
        </div>
    )
}