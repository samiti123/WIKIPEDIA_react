import React from "react";
import { Card, ListGroup, Nav } from "react-bootstrap";
import { Link, Route, Switch, useParams } from "react-router-dom";

// Get matched content by id from Local storage
export function getArticleById(id, article) {
  let data = "";

  article.forEach((obj) => {
    if (obj.id === Number(id)) {
      data = obj;
    }
  });

  if (data === "") {
    data = "Content not available";
  }

  return data;
}

//Display component
const Display = (props) => {
  const { id } = useParams();
  const { content } = getArticleById(id, props.article);

  function deleteContent() {
    const index = props.article.findIndex((obj) => obj.id === Number(id));
    props.article.splice(index, 1);
    props.setArticle([...props.article]);
  }

  return (
    <>
      <Nav as="ul" className="contentNav">
        <Nav.Item as="li">
          <Link to="/content">Back</Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Link to={`/richtextEditor/${id}`}>Edit</Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Link to="/content" onClick={deleteContent}>
            Delete
          </Link>
        </Nav.Item>
      </Nav>

      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
};

function array_chunk(array, chunkSize = 10) {
  const chunks = Math.ceil(array.length / chunkSize);
  const arrays = [];
  for (let i = 0; i < chunks; i++) {
    arrays.push(array.slice(i * chunkSize, i * chunkSize + chunkSize));
  }
  return arrays;
}

// Get title(s) from Local storage
const getTitle = ({ id, title, content }, index) => {
  return (
    <ListGroup.Item as="li" key={index}>
      <Link to={"/content/display/" + id} key={index}>
        {title}
      </Link>
    </ListGroup.Item>
  );
};

//Content Component
export default function Content(props) {
  const data = props.article;

  return (
    <div>
      <Switch>
        <Route path="/content" exact>
          <div className="d-flex">
            {array_chunk(data).map((chunk, index) => (
              <Card key={index} className="w-25 m-2">
                <ListGroup variant="flush">{chunk.map(getTitle)}</ListGroup>{" "}
              </Card>
            ))}
          </div>
        </Route>
        <Route path="/content/display/:id">
          <Display
            article={props.article}
            setArticle={props.setArticle}
            data={data}
          ></Display>
        </Route>
        <Route path="/content/notAvailable">
          <h2>Content not available</h2>
        </Route>
      </Switch>
    </div>
  );
}
