import { useSearchParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import FilterPill from "../../atoms/FilterPill";
import "./ResultFilters.scss";

interface ResultFiltersProps {
  label?: string;
  itemsList?: LatestSurveyTypes[];
  filterAll?: boolean;
}

const getFiltersSet = (itemsList: any) => {
  const uniqueIds: any[] = [];
  const uniqueItems = itemsList.filter(({ service }: any) => {
    const isDuplicate = uniqueIds.includes(service.id);

    if (!isDuplicate) {
      uniqueIds.push(service.id);
      return true;
    }
    return false;
  });

  return uniqueItems;
};

const ResultFilters = ({
  itemsList,
  label = "Filtruj po świadczeniach",
  filterAll = false,
}: ResultFiltersProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filteredSet = getFiltersSet(itemsList);

  // const handleFilterPillToggle = (service: any) => {
  //   setSearchParams({
  //     filterBy: [...searchParams.getAll("filterBy"), service.id.toString()]
  //   });
  // };

  return (
    <Container className="d-flex flex-column align-items-start gap-3 p-0">
      <p className="fw-normal-500 fs-14 m-0">{label}</p>
      <Container className="d-flex align-items-start p-0 gap-3 pills-overflow">
        {filterAll && (
          <Button
            className={`btn-sm ${
              searchParams.getAll("service").length
                ? "btn-pill-outline-primary"
                : "btn-pill-outline-primary-active"
            }`}
            onClick={() => setSearchParams()}
          >
            Wszystkie
          </Button>
        )}
        {filteredSet.map(({ service }: any) => (
          <FilterPill
            key={service.id}
            title={service.name}
            filterByName="service"
            filterId={service.id}
          />
        ))}
      </Container>
    </Container>
  );
};

export default ResultFilters;
