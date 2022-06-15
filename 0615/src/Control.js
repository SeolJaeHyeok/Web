import Button from '@mui/material/Button';
import { Link, useParams } from "react-router-dom";

export default function Control(props) {
  const params = useParams();
  const id = params.id;
  let contextUI = null;
  if (id) {
    contextUI = <>
      <Button component={Link} to={`/update/${id}`}>update</Button>
      <Button onClick={() => props.onDelete(id)}>delete</Button>
    </>;
  }
  return <>
    <Button component={Link} to="/create">create</Button>
    {contextUI}
  </>;
}
