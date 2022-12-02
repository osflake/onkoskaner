import { useState } from "react"
import { Container, Button } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { useMockDataQuery } from "../../hooks/useMockDataQuery"

import SearchResult from "../../components/SearchResult"
import ChangeCriteriaModal from "../../components/Modals/ChangeCriteriaModal"

import "./TestView.css"

const TestView = () => {
  const [showCriteriaModal, setShowCriteriaModal] = useState(false)
  const { data, isLoading, isError } = useMockDataQuery()
  const linkParams = useParams()

  if (isError) {
    return <div>Something went wrong...</div>
  }

  if (isLoading) {
    return <div>Loading data...</div>
  }

  console.log("linkParams", linkParams)

  return (
    <Container className="d-flex flex-column p-5 gap-5 justify-content-center align-items-center">
      <Container className="d-flex flex-column justify-content-center align-items-center gap-3">
        <h1 className="fw-bold results-title">Wyniki dla:</h1>
        <p className="results-title">{`${linkParams.examId} / ${linkParams.city}`}</p>
        <Button
          className="btn-pink"
          onClick={() => setShowCriteriaModal((prevState) => !prevState)}
        >
          ZMIEŃ KRYTERIA
        </Button>
        <ChangeCriteriaModal
          show={showCriteriaModal}
          handleClose={() => setShowCriteriaModal((prevState) => !prevState)}
        />
      </Container>
      <Container className="d-flex flex-column gap-5">
        <Container className="d-flex justify-content-between p-0">
          <Container className="d-flex p-0 gap-5 justify-content-start align-items-center breadcrumbs-font-size">
            <p className="results-title fw-normal-500">Sortowanie:</p>
            <p className="text-secondary">czas oczekiwania na wizytę</p>
            <p className="text-secondary">czas oczekiwania na opis badania</p>
            <p className="text-secondary">ocena ośrodka</p>
          </Container>
          <Button className="btn-outline-pink">FILTROWANIE</Button>
        </Container>

        {data &&
          data.map((place) => {
            return <SearchResult key={place.id} {...place} />
          })}
      </Container>
    </Container>
  )
}

export default TestView
