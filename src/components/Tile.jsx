import styles from './Tile.module.css'

export function Tile({ img_url, isRevealed, onRevealClick }) {

    return (
        <img 
            className={
                !isRevealed 
                    ? styles.tile
                    : `${styles.tile} ${styles.revealed}`
            }
            src={isRevealed ? img_url : ''}
            onClick={onRevealClick}
        >
        </img>
    )
}