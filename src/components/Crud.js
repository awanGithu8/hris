import React from "react";
import Search from "./Search";
import Table from "./Table";
import ButtonAdd from "./ButtonAdd";
import ModalForm from "./ModalForm";

export default function Crud(props, {children}) {
    console.log(children);
  return (
    <React.Fragment>
      <center>
        <h3>{props.title}</h3>
      </center>
      <Search {...props.search} />
      <ButtonAdd {...props.buttonAdd} />
      <Table {...props.table} />
      <ModalForm {...props.modalForm}>{children}</ModalForm>
    </React.Fragment>
  );
}
