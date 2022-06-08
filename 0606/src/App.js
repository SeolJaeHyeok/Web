import "./App.css";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";

const Header = () => {
  return (
    <header>
      <h1>
        <a href="/">WWW</a>
      </h1>
    </header>
  );
};
const Nav = ({ topics }) => {
  return (
    <nav>
      <ol>
        {topics.map(({ id, title, desc }) => (
          <li key={id}>
            <a href={"/read/" + title}>{desc}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
};
const Article = () => {
  return (
    <article>
      <h2>Welcome</h2>
      Hello, WEB!
    </article>
  );
};

const handleCreate = (e) => {
  console.log(e.target);
};

const handleUpdate = (e) => {
  console.log(e.target);
};

const handleDelete = (e) => {
  console.log(e.target);
};

function App() {
  const topics = [
    { id: 1, title: "html", desc: "HTML is ..." },
    { id: 2, title: "css", desc: "CSS is ..." },
  ];
  return (
    <div>
      <Header />
      <Nav topics={topics} />
      <Article />
      <ButtonGroup>
        <Button variant="contained" onClick={handleCreate}>
          Create
        </Button>
        <Button variant="contained" onClick={handleUpdate}>
          Update
        </Button>
      </ButtonGroup>
      <Button variant="contained" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
}

export default App;
