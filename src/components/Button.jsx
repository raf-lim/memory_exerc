import styles from './Button.module.css'

export function Button({ loadTilesOnClick, children }) {
    return <button className={styles.button} onClick={loadTilesOnClick}>
        {children}
    </button>
}