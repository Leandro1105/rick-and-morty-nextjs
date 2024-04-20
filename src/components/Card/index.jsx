import styles from './styles.module.css';
import { useRouter } from 'next/router';

export default function Card({ item }) {
    const router = useRouter();

    const handleClick = () => {
        console.log(item.id)
        router.push(`/character/${item.id}`);
    };

    return (
        <div className={styles.card} onClick={handleClick}>
            <img src={item?.image} alt={item?.name} />
            <div className={styles.text}>
                <h1>{item?.name}</h1>
                <h3 >{item?.status} - {item.species}</h3>
                <p>Gênero: </p>
                <h3>{item?.gender}</h3>
                <p>Origem: </p>
                <h3>{item?.origin.name}</h3>
            </div>
        </div>
    );
}
