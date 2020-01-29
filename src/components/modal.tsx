import * as React from "react";

const Modal: React.SFC<any> = ({ children, action, className }: any) => (
  <div className={className}>
    <div id="background" onClick={action} />
    {children}
  </div>
);

export default Modal;
