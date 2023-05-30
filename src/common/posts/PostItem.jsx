import React from "react";
import { Card, CardBody, CardText, CardTitle, Button } from "reactstrap";

export const PostItem = ({ data, handleHide }) => {
  return (
    <Card
      style={{
        width: "18rem",
      }}
    >
      <img
        alt="Sample"
        src={`https://source.unsplash.com/random/200x200?sig=${data.id}`}
      />
      <CardBody>
        <CardTitle tag="h5">sss{data.title}</CardTitle>

        <CardText>{data.body}</CardText>
        <Button onClick={() => handleHide(data.id)}>Hide me</Button>
      </CardBody>
    </Card>
  );
};
