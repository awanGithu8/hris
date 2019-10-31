import React from "react";
import Search from "./Search";
import Table from "./Table";
import ButtonAdd from "./ButtonAdd";

export default function Crud(props) {
  return (
    <React.Fragment>
      <center>
        <h3>{props.title}</h3>
      </center>

      <Search {...props.search} />
      <ButtonAdd {...props.buttonAdd} />
      <Table {...props.table} />
    </React.Fragment>
  );
}
