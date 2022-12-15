import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import StarsRating from "../../atoms/StarsRating";

interface FacilityReviewsProps {
  rating?: number;
}

const FacilityReviews = ({ rating }: FacilityReviewsProps) => {
  return (
    <Container className="d-flex flex-column align-items-start gap-5 results-title p-0">
      <Container className="d-flex justify-content-center align-items-center p-0">
        <h2 className="fw-bold">Opinie o placówce</h2>

        <Container className="d-flex justify-content-center align-items-center gap-2 w-auto">
          {rating && <StarsRating rating={rating} />}
          <h4 className="m-0">
            <Badge bg="info" className="m-0">
              {rating ? `${rating}/5` : "N/A"}
            </Badge>
          </h4>
          <p className="m-0">{`3 opinii`}</p>
        </Container>

        <Button className="btn-outline-pink">DODAJ SWOJĄ OPINIĘ</Button>
      </Container>

      <Container className="d-flex flex-column align-items-start gap-3 p-0">
        <p className="fw-normal-500 fs-14 m-0">Filtruj</p>
        <Container className="d-flex align-items-start p-0 gap-3">
          <Button className="btn-sm btn-pill-outline-primary">Wszystkie</Button>
          <Button className="btn-sm btn-pill-outline-primary">Pozytywne</Button>
          <Button className="btn-sm btn-pill-outline-primary">Negatywne</Button>
        </Container>
      </Container>

      <Container className="d-flex flex-column m-0 p-0 gap-4">
        <Container className="d-flex border p-0 m-0">
          <Container className="d-flex flex-column justify-content-start w-auto  py-4 ps-2 pe-5 border-end">
            <p className="fw-bold-600 text-nowrap">Adam Sobierajski</p>
            <p className="m-0">07.06.2019</p>
          </Container>
          <Container className="d-flex flex-column justify-content-start w-auto  align-items-center gap-3 py-4 px-5 border-end">
            {rating && <StarsRating rating={rating} />}
            <h4 className="m-0">
              <Badge bg="info" className="m-0">
                {rating ? `${rating}/5` : "N/A"}
              </Badge>
            </h4>
          </Container>
          <Container className="d-flex flex-column justify-content-center p-4">
            <p className="m-0">
              Bardzo pozytywna atmosfera. Miałam rezonans z kontrastem i problem
              z żyłami. Pani pielęgniarka mimo to poradziła sobie ze mną.
              Pomogła mi się ubrać po badaniu, gdyż trwało oni 50 minut. Byłam
              osłabiona i przykryte mnie kocem podczas badania. Płytkę bez
              problemu dostałam od razu. Warto było jechać z Gdańska.
            </p>
          </Container>
        </Container>

        <Container className="d-flex border p-0 m-0">
          <Container className="d-flex flex-column justify-content-start w-auto  py-4 ps-2 pe-5 border-end">
            <p className="fw-bold-600 text-nowrap">Adam Sobierajski</p>
            <p className="m-0">07.06.2019</p>
          </Container>
          <Container className="d-flex flex-column justify-content-start w-auto  align-items-center gap-3 py-4 px-5 border-end">
            {rating && <StarsRating rating={rating} />}
            <h4 className="m-0">
              <Badge bg="info" className="m-0">
                {rating ? `${rating}/5` : "N/A"}
              </Badge>
            </h4>
          </Container>
          <Container className="d-flex flex-column justify-content-center p-4">
            <p className="m-0">
              Witam,miałam tą jakże przykrą nieprzyjemnosć być na badaniach TK
              dn.09,12,2016 w Bytowie firma Nobo.Dwie panie (jedna blad ,krótkie
              włosy ,druga szatynka tez krótkie włosy)były bardzo
              chamskie.Traktują pacjentów jak zło konieczne.Są
              beszczelne,wulgarne itd....Nadmieniam,ze w kwietniu tez byłam tam
              na TK i było zupełnie inaczej :był wspaniały pan doktor i również
              bardzo fajna pani pielęgniarka.Dlatego ponownie wybrałam tą
              placówkę,ale po ostatnim doswiadczeniu już nigdy tam nie pojade
              brrrrrrrrrrrrrr,az mi skóra cierpnie na samą myśl o tych jędzach
              co to ponoc mają pomagac ludziom,a nie ich obrazac.
            </p>
          </Container>
        </Container>

        <Container className="d-flex border p-0 m-0">
          <Container className="d-flex flex-column justify-content-start w-auto  py-4 ps-2 pe-5 border-end">
            <p className="fw-bold-600 text-nowrap">Adam Sobierajski</p>
            <p className="m-0">07.06.2019</p>
          </Container>
          <Container className="d-flex flex-column justify-content-start w-auto  align-items-center gap-3 py-4 px-5 border-end">
            {rating && <StarsRating rating={rating} />}
            <h4 className="m-0">
              <Badge bg="info" className="m-0">
                {rating ? `${rating}/5` : "N/A"}
              </Badge>
            </h4>
          </Container>
          <Container className="d-flex flex-column justify-content-start p-4">
            <p className="m-0">
              Dostałam płytkę, której nie można odtworzyć. Ani ja ani lekarz w
              przychodni neurochirurgicznej Będę interweniować, pół roku
              czekania i g....
            </p>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default FacilityReviews;
