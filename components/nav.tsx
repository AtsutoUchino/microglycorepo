import Link from "next/link";
import styles from 'styles/nav.module.css'

export default function Nav(){
    return (
        <nav>
            <ul className={styles.list}>
                <li>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/about">
                        <a>About</a>
                    </Link>
                </li>
                <li>
                    <Link href="/template">
                        <a>Template</a>
                    </Link>
                </li>
                <li>
                    <Link href="/canvas">
                        <a>New create</a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}