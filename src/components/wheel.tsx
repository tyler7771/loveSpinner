import * as React from "react";

import Modal from "./modal";
import Winwheel from "./Winwheel";
import { stringify } from "querystring";
import { TweenMax as tween } from "gsap";

var TweenMax: any = tween;

interface IWheelProps {
  names: string[];
}

interface IWheelState {
  modalOpen: boolean;
  winner: string;
}

interface ISegmentProps {
  fillStyle: string;
  text: string;
  textFillStyle: string;
  textFontFamily: string;
}

export default class Wheel extends React.Component<IWheelProps, IWheelState> {
  constructor(props: any) {
    super(props);
    console.log(TweenMax);

    this.state = {
      modalOpen: false,
      winner: ""
    };

    this.wheelAnimation = this.wheelAnimation.bind(this);
    this.finishedCallback = this.finishedCallback.bind(this);
    this.finishedCallback = this.finishedCallback.bind(this);
    this.resetWheel = this.resetWheel.bind(this);
  }
  private theWheel: any;

  public componentDidMount() {
    this.theWheel = new Winwheel({
      animation: {
        callbackFinished: this.finishedCallback,
        duration: 5,
        spins: 8,
        type: "spinToStop"
      },
      lineWidth: 3,
      numSegments: 4,
      segments: this.createSegments(),
      strokeStyle: "#fff",
      textFontSize: 40
    });

    this.forceUpdate();
  }

  public render(): JSX.Element {
    return (
      <>
        <div id="wheel-container">
          <div id="arrow" />
          <canvas
            id="canvas"
            width={window.innerWidth}
            height={window.innerHeight * 0.75}
          />
          <div id="button-container">
            <button id="heart" onClick={this.wheelAnimation}>
              <div id="box" />
              <span>Spin!</span>
            </button>
          </div>
        </div>
        {this.checkModal()}
      </>
    );
  }

  private checkModal() {
    if (this.state.modalOpen) {
      return (
        <Modal action={this.resetWheel} className="modal">
          <div onClick={this.resetWheel} className="container">
            <h2>Congratulations {this.state.winner}!</h2>
            <h2>You're going on a date with Kyle!</h2>
            <button onClick={this.resetWheel}>Spin Again!</button>
          </div>
        </Modal>
      );
    } else {
      return null;
    }
  }

  private resetWheel() {
    this.setState({
      modalOpen: false,
      winner: ""
    });

    this.theWheel.stopAnimation(false);
    this.theWheel.rotationAngle = 0;
    this.theWheel.draw();
  }

  private wheelAnimation(e) {
    if (!this.theWheel) {
      return;
    } else {
      let stopAt =
        1 + Math.floor(Math.random() * (360 / this.props.names.length));
      this.theWheel.animation.stopAngle = stopAt;
      this.theWheel.startAnimation();
    }
  }

  private finishedCallback() {
    let winningSegment = this.theWheel.getIndicatedSegment();

    this.setState({
      modalOpen: true,
      winner: winningSegment.text
    });
  }

  private createSegments() {
    const colors = ["#bd5353", "#eea7cb"];
    let segments: ISegmentProps[] = [];

    this.props.names.forEach((text: string, i: number) => {
      segments.push({
        fillStyle: colors[i % colors.length],
        text,
        textFillStyle: "#fff",
        textFontFamily: "Pacifico"
      });
    });

    return segments;
  }
}
