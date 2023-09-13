import * as React from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const LinkButton = styled(Link)({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: "#0f1419",
  borderRadius: "24px",
  padding: "6px 20px 6px 6px",
  fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
  "&:hover": {
    backgroundColor: "#f7f9f9",
  },
});

export default function TwitterLink(props) {
  return <LinkButton {...props}>{props.children}</LinkButton>;
}
