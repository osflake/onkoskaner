import Container from "react-bootstrap/Container";
import { ReactComponent as StarEmpty } from "./Icons/star-empty.svg";
import { ReactComponent as StarHalf } from "./Icons/star-half.svg";
import { ReactComponent as StarFilled } from "./Icons/star-filled.svg";

interface StarsRatingProps {
  rating?: string;
}

const StarsRating = ({ rating }: StarsRatingProps) => {
  const renderStars = () => {
    let currentRating = 2.5;
    let stars = [];

    for (let i = 0; i < 5; i++) {
      if (currentRating >= 1) {
        stars.push(1);
      } else if (currentRating < 1 && currentRating > 0) {
        stars.push(2);
      } else {
        stars.push(0);
      }
      currentRating--;
    }

    return stars.map((star, index) => {
      if (star === 1) {
        return <StarFilled key={index} width={16} height={15} />;
      } else if (star === 2) {
        return <StarHalf key={index} width={16} height={15} />;
      } else {
        return <StarEmpty key={index} width={16} height={15} />;
      }
    });
  };

  return (
    <Container className="d-flex flex-row align-items-center justify-content-center gap-2">
      {renderStars()}
    </Container>
  );
};

export default StarsRating;
