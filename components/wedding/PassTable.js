import styles from './PassTable.module.css';
export function PassTable({tableNumber}){
 const value=String(tableNumber??'').trim();
 if(!/^[1-9]\d{0,5}$/.test(value))return null;
 return <div className={styles.table} data-pass-table><span>Tu mesa</span><strong>{value}</strong></div>;
}
