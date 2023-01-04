import { Container } from "react-bootstrap";
import { ReactComponent as ToiletIcon } from "../../../assets/Icons/BenefitIcons/ToiletIcon.svg";
import { ReactComponent as ElevatorIcon } from "../../../assets/Icons/BenefitIcons/ElevatorIcon.svg";
import { ReactComponent as ParkingIcon } from "../../../assets/Icons/BenefitIcons/ParkingIcon.svg";
import { ReactComponent as RampIcon } from "../../../assets/Icons/BenefitIcons/RampIcon.svg";
import { ReactComponent as BlocksIcon } from "../../../assets/Icons/BenefitIcons/BlocksIcon.svg";
import { ReactComponent as VirusIcon } from "../../../assets/Icons/BenefitIcons/VirusIcon.svg";

import TooltipIcon from "../../atoms/TooltipIcon";

const ListOfFacilities = ({ data }: any) => {
  return (
    <Container className="p-0 d-flex align-items-center gap-3">
      {data.nfzToilet === "Y" && (
        <TooltipIcon desc="placówka z toaletą dla niepełnosprawnych">
          <ToiletIcon />
        </TooltipIcon>
      )}
      {data.nfzCovid19 === "Y" && (
        <TooltipIcon desc="placówka realizująca świadczenia covidowe">
          <VirusIcon />
        </TooltipIcon>
      )}
      {data.nfzElevator === "Y" && (
        <TooltipIcon desc="placówka posiadająca windę">
          <ElevatorIcon />
        </TooltipIcon>
      )}
      {data.nfzCarPark === "Y" && (
        <TooltipIcon desc="placówka posiadająca parking">
          <ParkingIcon />
        </TooltipIcon>
      )}
      {data.nfzManyPlaces === "Y" && (
        <TooltipIcon desc="placówka realizująca świadczenia również dla dzieci">
          <BlocksIcon />
        </TooltipIcon>
      )}
      {data.nfzRamp === "Y" && (
        <TooltipIcon desc="placówka posiadająca podjazd dla osób niepełnosprawnych">
          <RampIcon />
        </TooltipIcon>
      )}
      {!data.nfzToilet && !data.nfzRamp && <span>Brak informacji</span>}
    </Container>
  );
};

export default ListOfFacilities;
