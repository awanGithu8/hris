import React from "react";
import Search from "./Search";
import Table from "./Table";

export default function Crud(props) {
  return (
    <React.Fragment>
      <center>
        <h3>{props.title}</h3>
      </center>

      <Search {...props.search} />
      <Table {...props.table} />
    </React.Fragment>
  );
}
