import { useMemo } from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const unknownError = useRouteError();
  const error = useMemo(() => {
    return unknownError instanceof Error ? unknownError.message : unknownError?.toString();
  }, [unknownError])

  return (
    <section className="content">
      <div id="error-page" className="card">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error}</i>
        </p>
      </div>
    </section>
  );
}
