import styles from 'styles/staining.module.css'
import Link from 'next/link';

const Staining = () => {
    return (
        <div className={styles.container}>
            <h1>Gram staining</h1>
            <div className={styles.imagesWrapper}>
                <Link href="/template/staining/gram-positive">
                    <div className={styles.image}>
                        <img src="/image/template/staining/gram-positive.svg" />
                    </div>
                </Link>
                <Link href="/template/staining/gram-negative">
                    <div className={styles.image}>
                        <img src="/image/template/staining/gram-negative.svg" />
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Staining;