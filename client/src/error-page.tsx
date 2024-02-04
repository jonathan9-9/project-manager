import { useRouteError } from "react-router";

interface ErrorDetails {
  statusText?: string;
  message?: string;
}

function isErrorDetails(error: unknown): error is ErrorDetails {
  return (
    typeof error === "object" &&
    error !== null &&
    ("statusText" in error || "message" in error)
  );
}

function ErrorPage() {
  const error = useRouteError() as ErrorDetails;

  if (!isErrorDetails(error)) {
    console.error("Unexpected error type:", error);

    return (
      <div>
        <h1>Oops!</h1>
        <p>An unexpected error has occurred.</p>
      </div>
    );
  }

  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>An unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;
