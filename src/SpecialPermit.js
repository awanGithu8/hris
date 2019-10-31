import React from "react";
import Crud from "./components/Crud";

export default function SpecialPermit() {
  let searchParams = {
    placeholder: "Find Special Login"
  };
  let tableParams = {
      btn_add_title: "Add Special Permit"
  };

  function searchData(e) {
    // let dataFilter = data.filter(function (d) {
    //   return (
    //     d.username.toLowerCase().includes(e.target.value.toLowerCase()) ||
    //     d.role.toLowerCase().includes(e.target.value.toLowerCase())
    //   );
    // });
    // setdataSource(dataFilter);
  }

  return (
    <Crud
      title={"Special Permit List"}
      search={searchParams}
      table={tableParams}
      onPressEnter={searchData}
    />
  );
}
