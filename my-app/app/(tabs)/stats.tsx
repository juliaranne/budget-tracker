import React from "react";
import Loader from "@/components/loading-view";
import PaymentsChart from "@/components/payments-chart";
import useFetch from "@/hooks/use-fetch";

export default function StatsChart() {
  const { data, loading, error } = useFetch(
    "http://localhost:3000/api/payments",
    "GET"
  );

  return (
    <>
      {loading ? <Loader></Loader> : null}
      {data && !error ? <PaymentsChart data={data}></PaymentsChart> : null}
      {error ? "Sorry there has been an error" : null}
    </>
  );
}
