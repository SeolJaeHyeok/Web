import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

export function Update(props) {
  const params = useParams();
  const id = params.id;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  useEffect(() => {
    (async () => {
      const res = await fetch('/topics/' + id);
      const data = await res.json();
      setTitle(data.title);
      setBody(data.body);
    })();
  }, [id]);
  return <article>
    <h2>Update</h2>
    <form onSubmit={(evt) => {
      evt.preventDefault();
      const title = evt.target.title.value;
      const body = evt.target.body.value;
      props.onUpdate(id, title, body);
    }}>
      <p><input type="text" name="title" placeholder="title" value={title} onChange={e => setTitle(e.target.value)}></input></p>
      <p><textarea name="body" placeholder="body" value={body} onChange={e => setBody(e.target.value)}></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>;
}
