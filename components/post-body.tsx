import { ReactNode } from "react";
import styles from 'styles/post-body.module.css'

interface Props {
    children: ReactNode;
}


export default function PostBody({ children }: Props) {
  return (
    <div className={styles.stack}>
      {children}
    </div>
  )
}