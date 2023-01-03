import { Button, Container } from "react-bootstrap";
import "./StatsTemplate.scss";
import StatsForm from "../../organisms/StatsForm/StatsForm";
import LineChart from "../../molecules/LineChart/LineChart";
import { Map } from "../../molecules/Map/Map";
import StatsTable from "../../organisms/tables/StatsTable/StatsTable";
import OtherStats from "../../organisms/OtherRaports/OtherStats";
import downloadPdf from "../../../hooks/downloadPdf";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getStatsByDate,
  getStatsByProvince,
} from "../../../services/api/statsApi";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import MobileReportTable from "../../organisms/tables/MobileReportTable/MobileReportTable";
import logo from "../../../assets/images/logo.png";
import krs from "../../../assets/images/krs.png";

const StatsTemplate = ({ adminRole }: { adminRole: boolean }) => {
  const [searchParams] = useSearchParams();
  const [buttonIsBlocked, setButtonIsBlocked] = useState(false);

  const { register, watch, setValue } = useForm({
    defaultValues: {
      statsBy: "1",
      queueId: "1",
      waitingTime: "minDaysUntilExamination",
      displayBy: "1",
      setTime: "2",
    },
  });
  const printRef = useRef<HTMLInputElement>(null);
  const [queryParams, setQueryParams] = useState({});

  const { data: provinceStatsData } = useQuery({
    queryKey: [watch("queueId"), queryParams, searchParams.get("sortBy")],
    queryFn: getStatsByProvince({
      queryParams,
      queueId: watch("queueId"),
      sortBy: searchParams.get("sortBy"),
    }),
    refetchOnWindowFocus: false,
  });

  const { data: dateStatsData } = useQuery({
    queryKey: [queryParams, "normal"],
    queryFn: getStatsByDate({
      queryParams,
      queueId: 1,
    }),
    refetchOnWindowFocus: false,
  });

  const { data: dateStatsDataCito } = useQuery({
    queryKey: [queryParams, "cito"],
    queryFn: getStatsByDate({
      queryParams,
      queueId: 2,
    }),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setQueryParams({
      serviceId: searchParams.get("serviceId") || "217",
      provinceId: searchParams.get("provinceId") || "",
      cityId: searchParams.get("cityId") || "",
      days: searchParams.get("days") || "30",
      dateTo:
        searchParams.get("dateTo") || new Date().toISOString().split("T")[0],
    });
  }, [searchParams]);

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 576px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 576px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, [searchParams]);

  return (
    <Container className="d-flex flex-column  justify-content-center align-items-center p-0">
      <div className="w-100 d-flex flex-column justify-content-center align-items-center px-3 py-5">
        <Container
          className="d-flex pb-4 flex-column justify-content-center align-items-center"
          style={{ maxWidth: "738px" }}
        >
          <h1 className="fw-bold results-title mb-5 ">Dla eksperta</h1>
          <p className="results-title mt-3">
            Na tej podstronie będziesz mieć możliwość zobaczyć szczegółowe
            statystyki dotyczące terminów wybranych badań. Za zbieranie
            statystyk odpowiedzialny jest nasz zespół, który codziennie
            weryfikuje dostępność terminów badań, aby mieć jak najlepszy obraz
            tego, jak wyglądają czasy oczekiwania na badania w placówkach na
            terenie Polski
          </p>
        </Container>
        <StatsForm />
        <Container style={{ maxWidth: "738px" }}>
          <p className="results-title mt-3 mb-0 text-center">
            Średni czas oczekiwania w{" "}
            {(dateStatsData?.data?.province && !dateStatsData?.data?.city) ||
            (dateStatsDataCito?.data?.province &&
              !dateStatsDataCito?.data?.city) ? (
              <span className="fw-bolder">
                {dateStatsData?.data?.province?.name}{" "}
              </span>
            ) : null}
            {(dateStatsData?.data?.province && dateStatsData?.data?.city) ||
            (dateStatsDataCito?.data?.province &&
              !dateStatsDataCito?.data?.city) ? (
              <span className="fw-bolder">
                {dateStatsData?.data?.city?.name}{" "}
              </span>
            ) : null}
            {(!dateStatsData?.data?.province && !dateStatsData?.data?.city) ||
            (!dateStatsDataCito?.data?.province &&
              !dateStatsDataCito?.data?.city) ? (
              <span className="fw-bolder"> całej Polsce </span>
            ) : null}
            na świadczenie{" "}
            <span className="fw-bolder">
              {` ${
                dateStatsData?.data.service?.name ||
                dateStatsDataCito?.data.service?.name ||
                ""
              } `}
            </span>{" "}
            w przeciągu ostatnich{" "}
            <span className="fw-bolder">
              {dateStatsData?.data?.days || dateStatsDataCito?.data?.days}
            </span>{" "}
            dni stan na{" "}
            <span className="fw-bolder">
              {dateStatsData?.data?.dateTo || dateStatsDataCito?.data?.dateTo}
            </span>
          </p>
        </Container>
        <LineChart
          nomralData={dateStatsData?.data}
          citoData={dateStatsDataCito?.data}
          queue={dateStatsData?.data?.queue}
          pdf={false}
          register={register}
          watch={watch}
          setValue={setValue}
          loading={loading}
        />
        <Container className="my-4" style={{ maxWidth: "738px" }}>
          <p className="results-title mt-3 mb-0 text-center">
            Czas oczekiwania na świadczenie
            <span className="fw-bolder">
              {` ${
                dateStatsData?.data.service?.name ||
                dateStatsDataCito?.data.service?.name
              } `}
            </span>
            w poszczególnych wojewódzctwach w okresie
            <span className="fw-bolder"> {dateStatsData?.data?.days} </span> dni
            <br />
            <span className="fw-bolder">
              stan na{" "}
              {dateStatsData?.data?.dateTo || dateStatsDataCito?.data?.dateTo}
            </span>
          </p>
        </Container>

        <Map data={provinceStatsData?.data} watch={watch} register={register} />
        {matches ? (
          <StatsTable
            data={provinceStatsData?.data}
            adminRole={adminRole}
            register={register}
            watch={watch}
          />
        ) : (
          <MobileReportTable
            data={provinceStatsData?.data}
            adminRole={adminRole}
            register={register}
            watch={watch}
          />
        )}
      </div>

      <div className="px-3 w-100">
        <div className="mb-5 row justify-content-md-end">
          <Button
            onClick={() => {
              setButtonIsBlocked(true);
              downloadPdf(printRef).then(() => setButtonIsBlocked(false));
            }}
            disabled={buttonIsBlocked}
            className="btn-outline-pink col col-lg-3 loadingButton"
          >
            POBIERZ RAPORT PDF
            {buttonIsBlocked && (
              <div className="loadingButtonSpinner">
                <div className="spinner-border " role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </Button>
        </div>
        <OtherStats />
      </div>

      <Container
        ref={printRef}
        className="w-100 d-flex flex-column justify-content-center align-items-center px-5 py-5 pdfContainer m-5"
      >
        <Container className="d-flex pb-4">
          <img src={logo} alt="" />
          <div className="ps-5">
            <img src={krs} alt="" />{" "}
            <span className="krsText">KRS 0000358654</span>
          </div>
        </Container>
        <Container
          className="d-flex pb-4 flex-column justify-content-center align-items-center"
          style={{ maxWidth: "738px" }}
        >
          <h1 className="fw-bold results-title mb-5 ">Dla eksperta</h1>
          <p className="results-title mt-3">
            Na tej podstronie będziesz mieć możliwość zobaczyć szczegółowe
            statystyki dotyczące terminów wybranych badań. Za zbieranie
            statystyk odpowiedzialny jest nasz zespół, który codziennie
            weryfikuje dostępność terminów badań, aby mieć jak najlepszy obraz
            tego, jak wyglądają czasy oczekiwania na badania w placówkach na
            terenie Polski
          </p>
        </Container>
        <Container style={{ maxWidth: "738px" }}>
          <p className="results-title mt-3 mb-0 text-center">
            Średni czas oczekiwania w{" "}
            {(dateStatsData?.data?.province && !dateStatsData?.data?.city) ||
            (dateStatsDataCito?.data?.province &&
              !dateStatsDataCito?.data?.city) ? (
              <span className="fw-bolder">
                {dateStatsData?.data?.province?.name}{" "}
              </span>
            ) : null}
            {(dateStatsData?.data?.province && dateStatsData?.data?.city) ||
            (dateStatsDataCito?.data?.province &&
              !dateStatsDataCito?.data?.city) ? (
              <span className="fw-bolder">
                {dateStatsData?.data?.city?.name}{" "}
              </span>
            ) : null}
            {(!dateStatsData?.data?.province && !dateStatsData?.data?.city) ||
            (!dateStatsDataCito?.data?.province &&
              !dateStatsDataCito?.data?.city) ? (
              <span className="fw-bolder"> całej Polsce </span>
            ) : null}
            na świadczenie{" "}
            <span className="fw-bolder">
              {` ${
                dateStatsData?.data.service?.name ||
                dateStatsDataCito?.data.service?.name ||
                ""
              } `}
            </span>{" "}
            w przeciągu ostatnich{" "}
            <span className="fw-bolder">
              {dateStatsData?.data?.days || dateStatsDataCito?.data?.days}
            </span>{" "}
            dni stan na{" "}
            <span className="fw-bolder">
              {dateStatsData?.data?.dateTo || dateStatsDataCito?.data?.dateTo}
            </span>
          </p>
        </Container>
        <LineChart
          nomralData={dateStatsData?.data}
          citoData={dateStatsDataCito?.data}
          queue={dateStatsData?.data?.queue}
          pdf={true}
          register={register}
          watch={watch}
          setValue={setValue}
          loading={loading}
        />
        <Container className="my-4" style={{ maxWidth: "738px" }}>
          <p className="results-title mt-3 mb-0 text-center">
            Czas oczekiwania na świadczenie
            <span className="fw-bolder">
              {` ${
                dateStatsData?.data.service?.name ||
                dateStatsDataCito?.data.service?.name
              } `}
            </span>
            w poszczególnych wojewódzctwach w okresie
            <span className="fw-bolder"> {dateStatsData?.data?.days} </span> dni
            <br />
            <span className="fw-bolder">
              stan na{" "}
              {dateStatsData?.data?.dateTo || dateStatsDataCito?.data?.dateTo}
            </span>
          </p>
        </Container>

        <Map
          data={provinceStatsData?.data}
          watch={watch}
          register={register}
          pdf
        />
        {matches ? (
          <StatsTable
            data={provinceStatsData?.data}
            adminRole={adminRole}
            register={register}
            watch={watch}
            pdf
          />
        ) : (
          <MobileReportTable
            data={provinceStatsData?.data}
            adminRole={adminRole}
            register={register}
            watch={watch}
          />
        )}
        <div className="pdfFooter">
          <span>
            dokument wygenerowany elektronicznie:{" "}
            {new Date().toISOString().split("T")[0]}{" "}
            {new Date().toISOString().split("T")[1].slice(0, 8)}
          </span>
        </div>
      </Container>
    </Container>
  );
};

export default StatsTemplate;
