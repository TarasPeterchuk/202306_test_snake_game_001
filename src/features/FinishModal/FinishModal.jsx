import styles from './FinishModal.module.css';

export const FinishModal = () => (
  <>
    <a type="button" className={styles.infoBtn} href="#popup">
      INFO
    </a>
    <label id="popup" className={styles.overlay}>
      <div className={styles.popup}>
        <h2>Snake Game</h2>

        <a className={styles.close} href="#">
          &times;
        </a>
      </div>
    </label>
  </>
);
