//Library imports
import React from "react";
import { Typography, Card, Button } from "antd";
import { connect } from "react-redux";
import { toggleDrawer } from "../../../state/actions";

const { Title, Text } = Typography;

function RenderHomePage({ toggleDrawer }) {
  const openNav = () => {
    toggleDrawer();
  };
  return (
    <>
      <div className="background-image" role="img" />
      <Card className="title-card">
        <Title>Citrics</Title>
        <Text>Your one stop for city metrics!</Text>
        <br />
        <br />
        <Button type="primary" onClick={openNav}>
          Get Started
        </Button>
      </Card>
    </>
  );
}
export default connect(null, { toggleDrawer })(RenderHomePage);
