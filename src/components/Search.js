import React, { useState, useEffect } from "react";
import { Input, Row, Col, Button } from "antd";

export default function SearchComponent(props) {
  // const [searchEvent, setSearchEvent] = useState("");
  // useEffect(() => {
  //   // console.log(searchEvent.target.value);
  //   console.log(searchEvent);
  // }, [searchEvent])
  return (
    <Row>
      <Col span={24}>
        <Input
          placeholder={props.placeholder}
          onPressEnter={props.onSearch}
          //onBlur={(e) => setSearchEvent(e)}
        />
      </Col>
      {/* <Col span={2}>
        <Button type="primary" icon="search" onClick={() => props.onSearch(searchEvent)}>
          Search
        </Button>
      </Col> */}
    </Row>
  );
}
