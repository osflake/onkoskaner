import { useRef, useState } from "react";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";

interface TooltipIconProps {
  desc: string;
  children: any;
}

const TooltipIcon = ({ desc, children }: TooltipIconProps) => {
  const [show, setShow] = useState(false);
  const iconRef = useRef(null);
  return (
    <>
      <div
        ref={iconRef}
        onMouseLeave={() => setShow(false)}
        onMouseEnter={() => setShow(true)}
      >
        {children}
        <Overlay placement="top" target={iconRef.current} show={show}>
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              {desc}
            </Tooltip>
          )}
        </Overlay>
      </div>
    </>
  );
};

export default TooltipIcon;
