import { useState } from "react";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import { useParams } from "react-router-dom";
import "./ServiceDetails.scss";
import PercentageProgress from "../../atoms/PercentageProgress";
import OpeningHours from "../../atoms/OpeningHours";
import OtherTermModal from "../Modals/OtherTermModal";
import { getFacilityByDepartment } from "../../../services/api/facilitiesApi";
import { getSurveyCalls } from "../../../services/api/surveyCalls";
import { useQuery } from "@tanstack/react-query";

interface ServiceDetailsProps {
  name: string;
  daysToExamination?: number;
  facility: FacilityDataTypes["facility"];
  avgTotalCallsPercents?: number;
  surveyId?: number;
  serviceId: number;
  queueId: number;
  daysToResults?: number;
  daysUntilExamination?: number;
  updatedAt?: any;
}

const ServiceDetails = ({
  facility,
  name,
  avgTotalCallsPercents = 40,
  surveyId,
  serviceId,
  queueId,
  daysToResults,
  daysUntilExamination,
  updatedAt
}: ServiceDetailsProps) => {
  const [isCollapse, setCollapse] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleCollapse = () => {
    setCollapse((prev) => !prev);
  };
  const linkParams = useParams();

  const { data: facilityByDepartment } = useQuery({
    queryKey: [`getFacilityByDepartment/${serviceId.toString()}`],
    queryFn: getFacilityByDepartment({
      facilityId: linkParams.facilityId,
      serviceId: serviceId.toString()
    }),
    refetchOnWindowFocus: false
  });

  const { data: surveyCalls } = useQuery(
    getSurveyCalls({
      facilityId: linkParams.facilityId,
      serviceId: serviceId.toString(),
      queueId: queueId.toString()
    })
  );

  const data = facilityByDepartment?.data[0];
  // console.log("surveyCalls", surveyCalls);
  // console.log(data);

  const openHours = data?.openHours && JSON.parse(data?.openHours);

  return (
    <Container
      className={`d-flex flex-column align-items-center border ${
        queueId === 2 && "border-danger"
      } p-0 m-0`}
    >
      <Container className="row d-flex p-0 m-0">
        <Container className="col-12 col-lg-3 details-rwd-queue border-end pt-3 px-4">
          <h6 className="m-0 fw-bold-600">{name}</h6>
          {queueId === 2 && <h5 className="m-0 cito-text">CITO</h5>}
        </Container>

        <Container className="col-12 col-lg-3 d-flex justify-content-between align-items-center border-end pt-3 px-4">
          <p className="m-0">Najbliższa wizyta za</p>
          <h4 className="d-flex m-0">
            <Badge
              bg="info"
              className={`m-0 ${
                daysUntilExamination ? "text-nowrap" : "text-wrap"
              }`}
            >
              {daysUntilExamination
                ? `${daysUntilExamination} dni`
                : "brak danych"}
            </Badge>
          </h4>
        </Container>

        <Container className="col-12 col-lg-3 d-flex justify-content-between align-items-center border-end pt-3 px-4">
          <p className="m-0">Oczekiwanie na opis</p>
          <h4 className="m-0">
            <Badge
              bg="info"
              className={`m-0 ${daysToResults ? "text-nowrap" : "text-wrap"}`}
            >
              {daysToResults ? `${daysToResults} dni` : "brak danych"}
            </Badge>
          </h4>
        </Container>

        <Container className="col-12 col-lg-3 d-flex flex-column justify-content-center align-items-center  py-3 px-5 gap-3">
          <Button className="btn-pink w-100">UMÓW SIĘ</Button>

          <Button
            variant="link"
            className="fs-14 booking-link fw-normal-500 m-0"
            onClick={() => setShowModal((prev) => !prev)}
          >
            Dostałeś inny termin?
          </Button>
          <OtherTermModal
            handleClose={() => setShowModal((prev) => !prev)}
            show={showModal}
            facilityId={facility.id}
            serviceId={serviceId}
            queueId={queueId}
          />
        </Container>
      </Container>

      <Accordion className="m-0 p-0 w-100 border-top">
        <Accordion.Body className="border-bottom p-0">
          <Container className="d-flex flex-column m-0 p-0">
            <Container className="row d-flex p-0 m-0">
              <OpeningHours openHours={openHours} />

              <Container className="col-12 col-lg-4 d-flex flex-column gap-4 border-end p-4">
                <p className="m-0 fw-bold-600">Kontakt z placówką</p>
                <Container className="d-flex align-items-center p-0 justify-content-between">
                  <p className="m-0">Numer telefonu</p>
                  <p className="m-0 fw-bold-600">
                    {data?.phoneNumber.length
                      ? data.phoneNumber
                      : facility.phoneNumber}
                  </p>
                </Container>
                <Container className="d-flex flex-column justify-content-center align-items-center gap-2">
                  <PercentageProgress
                    percentage={
                      surveyCalls ? Math.floor(surveyCalls.avgAnsweredCalls) : 0
                    }
                  />
                  <p className="text-center m-0 fs-13">
                    udanych połączeń telefonicznych do placówki
                  </p>
                </Container>
              </Container>

              <Container className="col-12 col-lg-4 d-flex flex-column justify-content-between gap-4 p-4">
                <div className="d-flex flex-column gap-2">
                  <p className="m-0 fw-bold-600">Dodatkowe informacje</p>
                  <p>
                    {data?.info ? data.info : "Brak dodatkowych informacji"}
                  </p>
                </div>
                {updatedAt ? (
                  <p className="m-0">
                    Ostatnia aktualizacja:{" "}
                    <span className="fw-bold-600">
                      {new Date(updatedAt).toISOString().split("T")[0]}
                    </span>
                  </p>
                ) : null}
              </Container>
            </Container>
          </Container>
        </Accordion.Body>
        <Accordion.Header
          onClick={() => handleCollapse()}
          className="w-100 accordion-details-bg"
        >
          {isCollapse ? (
            <p className="m-0 fw-normal-500">MNIEJ INFORMACJI</p>
          ) : (
            <p className="m-0 fw-normal-500">WIĘCEJ INFORMACJI</p>
          )}
        </Accordion.Header>
      </Accordion>
    </Container>
  );
};

export default ServiceDetails;
