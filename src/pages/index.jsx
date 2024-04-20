import styles from "../styles/Home.module.css";
import Loader from "@/components/Loader";
import Card from "@/components/Card";
import api from "@/tools/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getPersonagens = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/character?page=${page}`);
      setData((prevData) => [...prevData, ...res.data.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPersonagens();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100;
      if (isBottom) {
        getPersonagens();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {data.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
      {loading && <Loader />}
    </div>
  );
}
