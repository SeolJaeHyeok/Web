import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Article } from './Article';

export function Read(props) {
  const params = useParams();
  const id = params.id;
  const [topic, setTopic] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await fetch('/topics/' + id);
      const data = await res.json();
      setTopic(data);
    })();
  }, [id]);
  return <Article title={topic?.title} body={topic?.body}></Article>;
}
