import * as React from "react";

import Wheel from "./wheel";

export default class Wrapper extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className="App">
        <header className="App-header">
          <Wheel />
        </header>
      </div>
    );
  }
}
