import { Container } from "react-bootstrap";
import { ReactComponent as ToiletIcon } from "../../../assets/Icons/BenefitIcons/ToiletIcon.svg";
import { ReactComponent as ElevatorIcon } from "../../../assets/Icons/BenefitIcons/ElevatorIcon.svg";
import { ReactComponent as ParkingIcon } from "../../../assets/Icons/BenefitIcons/ParkingIcon.svg";
import { ReactComponent as RampIcon } from "../../../assets/Icons/BenefitIcons/RampIcon.svg";
import { ReactComponent as BlocksIcon } from "../../../assets/Icons/BenefitIcons/BlocksIcon.svg";
import { ReactComponent as VirusIcon } from "../../../assets/Icons/BenefitIcons/VirusIcon.svg";

const ListOfFacilities = ({ data }: any) => {
  console.log(data);
  return (
    <Container className="p-0 d-flex align-items-center gap-3">
      {data.nfzToilet === "Y" && <ToiletIcon />}
      {data.nfzCovid19 === "Y" && <VirusIcon />}
      {data.nfzElevator === "Y" && <ElevatorIcon />}
      {data.nfzCarPark === "Y" && <ParkingIcon />}
      {data.nfzManyPlaces === "Y" && <BlocksIcon />}
      {data.nfzRamp === "Y" && <RampIcon />}
      {!data.nfzToilet && !data.nfzRamp && <span>Brak informacji</span>}
    </Container>
  );
};

export default ListOfFacilities;
