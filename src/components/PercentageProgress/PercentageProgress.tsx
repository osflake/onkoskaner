import Container from "react-bootstrap/Container"
import Badge from "react-bootstrap/Badge"

import "./PercentageProgress.css"

interface PercentageProgressProps {
  percentage?: string
}

const PercentageProgress = ({ percentage = "40" }: PercentageProgressProps) => {
  const getTooltipColor = (percent: number) => {
    if (percent < 40) {
      return "danger"
    } else if (percent >= 40 && percent < 75) {
      return "warning"
    } else {
      return "success"
    }
  }

  return (
    <Container className="d-flex align-items-center">
      <div style={{ width: `${percentage}%` }} className="progress-left"></div>
      <h4 className="m-0">
        <Badge
          bg={getTooltipColor(parseInt(percentage))}
          className="m-0"
        >{`${percentage}%`}</Badge>
      </h4>
      <div
        style={{ width: `${100 - parseInt(percentage)}%` }}
        className="progress-right"
      ></div>
    </Container>
  )
}

export default PercentageProgress
