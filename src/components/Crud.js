import React from "react";
import Search from "./Search";
import Table from "./Table";
import ButtonAdd from "./ButtonAdd";
import ModalForm from "./ModalForm";

export default function Crud(props) {
  function onSearch(e) {
    let searchValue = e.target.value;
    let dataFilter = props.table.tableParams.dataSourceOri.filter(function(d) {
      return d.description.toLowerCase().includes(searchValue.toLowerCase());
    });

    props.table.settableParams({ ...props.table.tableParams, dataSource: dataFilter});
  }
  return (
    <React.Fragment>
      <center>
        <h3>{props.title}</h3>
      </center>
      <Search {...props.search} onSearch={onSearch} />
      <ButtonAdd {...props.buttonAdd} />
      <Table {...props.table.tableParams} />
      <ModalForm {...props.modalForm}>
        {props.children}
      </ModalForm>
    </React.Fragment>
  );
}
