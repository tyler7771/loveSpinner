import * as React from "react";

import Wheel from "./wheel";

interface IWrapperState {
  inputVal: string;
  names: string[];
  showWheel: boolean;
}

export default class Wrapper extends React.Component<any, IWrapperState> {
  constructor(props: any) {
    super(props);

    this.state = {
      inputVal: "",
      names: [],
      showWheel: false
    };

    this.update = this.update.bind(this);
    this.addPerson = this.addPerson.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div className="App">
        <header className="App-header">{this.showWheel()}</header>
      </div>
    );
  }

  private showWheel() {
    if (this.state.showWheel) {
      return <Wheel />;
    } else {
      return (
        <>
          <form onSubmit={e => this.addPerson(e)}>
            <input
              type="text"
              placeholder="Name"
              value={this.state.inputVal}
              onChange={e => this.update(e)}
            />
            <button type="submit">Add</button>
          </form>
          {this.state.names.map((person: string, i: number) => {
            return (
              <div key={i}>
                <span>{person}</span>
                <button data-name={person} onClick={e => this.removePerson(e)}>
                  x
                </button>
              </div>
            );
          })}
        </>
      );
    }
  }

  private addPerson(e) {
    e.preventDefault();
    const names: string[] = [...this.state.names, this.state.inputVal].sort();

    this.setState((prevState: IWrapperState) => ({
      ...prevState,
      inputVal: "",
      names
    }));
  }

  private update(e) {
    e.preventDefault();
    const inputVal = e.target.value;

    this.setState((prevState: IWrapperState) => ({
      ...prevState,
      inputVal
    }));
  }

  private removePerson(e) {
    e.preventDefault();
    let names = this.state.names;
    const personToRemove = e.target.dataset.name;

    names = names.filter((name: string) => name !== personToRemove);

    this.setState((prevState: IWrapperState) => ({
      ...prevState,
      names
    }));
  }
}
