import * as React from "react";
import { Button } from "@fluentui/react-components";
import { OfficeApi } from "./../api/officeApi";

export const ButtonWrapper: React.FC = () => {
  const [hostName, setHostName] = React.useState("unknown");
  const clickHandler = () => {
    console.log("before calling api...");
    const api = new OfficeApi();
    const host = api.getHost();
    console.log(`host: ${host}`);
    setHostName(host);
  };

  return (
    <div>
      <Button onClick={clickHandler}>Click me</Button>
      <div>{hostName}</div>
    </div>
  );
};
