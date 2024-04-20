import { useRouter } from "next/router";
import api from "@/tools/api";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

export default function CharacterPage() {
  const router = useRouter();
  const { id } = router.query;
  const [character, setCharacter] = useState({});
  const [isError, setIsError] = useState(false);

  const getCharacter = async () => {
    try {
      const res = await api.get(`character/${id}`);
      setCharacter(res.data);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (id) {
      getCharacter();
    }
  }, [id]);

  return (
    <main className={styles.main}>
      {isError && <div>Erro</div>}
      {character && (
        <div className={styles.container}>
          <div className={styles.card}>
            <div>
              <img
                src={character.image}
                alt={character.name}
                width={200}
                height={200}
                className={styles.image}
              />
            </div>
            <div className={styles.info}>
              <p>
                <h4>Id:</h4> {character.id}
              </p>
              <p>
                <h4>Nome:</h4> {character.name}
              </p>
              <p>
                <h4>Status:</h4> {character.status}
              </p>
              <p>
                <h4>Gênero:</h4> {character.gender}
              </p>
              <p>
                <h4>Espécie:</h4> {character.species}
              </p>
              <p>
                <h4>Origem:</h4> {character.origin?.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
