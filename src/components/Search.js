import React from "react";
import { Input, Row, Col, Button } from "antd";

export default function SearchComponent(props) {
  return (
    <React.Fragment>
      <Row>
        <Col span={22}>
          <Input placeholder={props.placeholder} onPressEnter={props.onPressEnter} />
        </Col>
        <Col span={2}>
          <Button type="primary" icon="search">
            Search
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
}
