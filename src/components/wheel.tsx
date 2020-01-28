import * as React from "react";

import Winwheel from "./Winwheel";
import { TweenMax as tween } from "gsap";

var TweenMax: any = tween;

export default class Wheel extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    console.log(TweenMax);

    this.wheelAnimation = this.wheelAnimation.bind(this);
  }
  private theWheel: any;

  public componentDidMount() {
    this.theWheel = new Winwheel({
      numSegments: 4,
      segments: [
        { fillStyle: "#eae56f", text: "Prize One" },
        { fillStyle: "#89f26e", text: "Prize Two" },
        { fillStyle: "#7de6ef", text: "Prize Three" },
        { fillStyle: "#e7706f", text: "Prize Four" }
      ],
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

  private wheelAnimation() {
    if (!this.theWheel) {
      return;
    } else {
      this.theWheel.startAnimation();
    }
  }

  private finishedCallback() {
    console.log("finished");
  }
}
