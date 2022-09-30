import styles from 'styles/shape.module.css'
import Link from 'next/link';

const Shape = () => {
    return (
        <div className={styles.container}>
            <h1>Cell shape</h1>
            <div className={styles.imagesWrapper}>
                <Link href="/template/shape/coccus">
                    <div className={styles.image}>
                        <img src="/image/template/shape/spherical_bacteria/coccus.svg" alt="" />
                    </div>
                </Link>
                <Link href="/template/shape/bacillus">
                    <div className={styles.image}>
                        <img src="/image/template/shape/rod_shaped_bacteria/bacillus.svg" alt="" />
                    </div>
                </Link>
                <Link href="/template/shape/vibrto">
                    <div className={styles.image}>
                        <img src="/image/template/shape/rod_shaped_bacteria/vibrto.svg" alt="" />
                    </div>
                </Link>
                <Link href="/template/shape/spirullum">
                    <div className={styles.image}>
                        <img src="/image/template/shape/spital_bacteria/spirullum.svg" alt="" />
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Shape;