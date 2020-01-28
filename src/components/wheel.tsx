import * as React from "react";

import Winwheel from "./Winwheel";
import { TweenMax as tween } from "gsap";

var TweenMax: any = tween;

interface IWheelProps {
  names: string[];
}

interface ISegmentProps {
  fillStyle: string;
  text: string;
}

export default class Wheel extends React.Component<IWheelProps, any> {
  constructor(props: any) {
    super(props);
    console.log(TweenMax);

    this.wheelAnimation = this.wheelAnimation.bind(this);
  }
  private theWheel: any;

  public componentDidMount() {
    this.theWheel = new Winwheel({
      numSegments: 4,
      segments: this.createSegments(),
      animation: {
        type: "spinToStop",
        duration: 5,
        spins: 8
      }
    });

    this.forceUpdate();
  }

  public render(): JSX.Element {
    return (
      <>
        <canvas
          id="canvas"
          width={window.innerWidth}
          height={window.innerHeight * 0.75}
        />
        <button onClick={this.wheelAnimation}>start</button>
      </>
    );
  }

  private wheelAnimation(e) {
    if (!this.theWheel) {
      return;
    } else {
      this.theWheel.startAnimation();
    }
  }

  private finishedCallback() {
    console.log("finished");
  }

  private createSegments() {
    const colors = ["#960a0a", "#eea7cb"];
    let segments: ISegmentProps[] = [];

    this.props.names.forEach((text: string, i: number) => {
      debugger;
      segments.push({
        fillStyle: colors[i % colors.length],
        text
      });
    });

    return segments;
  }
}
