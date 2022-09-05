import logo from "./logo.svg";
import "./App.css";
import { useCallback, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

const UberHandleLogin = (props) => {
  const location = useLocation();

  console.log(location)
  const URL = "https://localhost:8090/int/uber-api/v1.0/register?redirectUrl=";
  // const URL = 'http://localhost:5000/uber2?redirectUri=';
  // const URL = 'http://localhost:8000/register1?redirectUri=';
  const UBER_URL =
    "https://login.uber.com/oauth/v2/authorize?client_id=XVHeHj1E3TNoagCYoMQj8PC0cJIlBh7P[…]pe=partner.vehicles&scope=partner.rewards&scope=partner.trips";
  const bearer =
    "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im5na3VtYnpYa29qbkNBaFJ2aXJLWSJ9.eyJodHRwczovL2luc2h1ci5jb20vaWRlbnRpdGllcyI6WyJlbWFpbC9lbWFpbCJdLCJpc3MiOiJodHRwczovL2luc2h1ci1kZXYwLWN1c3RvbWVyLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJlbWFpbHw2MmNlZDNlYjI2ZTZhMWM5ZDk5MzJhZTAiLCJhdWQiOlsiaHR0cHM6Ly9hcGkuZGV2Lmluc2h1ci5jb20vaW50IiwiaHR0cHM6Ly9pbnNodXItZGV2MC1jdXN0b21lci5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjYyMDUwMTA3LCJleHAiOjE2NjQ2NDIxMDcsImF6cCI6IlZ4Y2F0NjZNZDVhbkN6ZnVjMmptdWw2QzN6a1l3emlYIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInBlcm1pc3Npb25zIjpbXX0.IeBczPmOjub4XSKlC0-DvSMn-87INdbG1zMyESwbUIcDUlKmLPGqIrkW6SIK9b6qTvxfeP40vhFTcECopBqn1KWQBQxhl5ygr22EiADwnUFsK62xseIrJcPASTLHI-2oJY6l9S5-KnxrO9a-n0ZBQ2cG1d_puVRzRum_Wy-xXF0vE558-X_3lIKkelxJO7uEIIlLWCpxngtM8dYp6M8ykPv6bZeWSVQb_sX_UEdjRW5GhT4nTnvVLZ7sQkrlwpt6ovyRFdJn_eo1I-UJ9_RxVHlqLp5Vu6utk7yV9AUrYFFinoRPo3FVIly5VUBgs8ZCqq6zNH0HlyRPCIAhQpyy-A";
  const redirect = useCallback(
    (redirectUri) => {
      const history = props.history;
      history.push(redirectUri ?? "/");
    },
    [props.history]
  );

  const getRegister = useCallback(async () => {
    const afterUber = location.search || "";
    const redirectUri = new URLSearchParams(
      afterUber?.substring(afterUber.indexOf("?"))
    ).get("redirectUri");

    // try {
    //   const data = await axios.get(
    //     `${URL}http://localhost:3000/int${redirectUri}`
    //   );
    //   console.log({ data });
    // } catch (e) {
    //   // handleApiError(e, logger, 'checkTlcLicense(): Error');
    //   console.log(e);
    //   throw e;
    // }

    console.log({ afterUber, redirectUri });
    // fetch(`${URL}http://localhost:3000/int${redirectUri}`, {
    fetch(
      `${URL}https://stackoverflow.com/questions/57431355/how-to-fix-431-request-header-fields-too-large-in-react-redux-app`,
      {
        // method: 'GET',
        redirect: 'follow',
        mode: "no-cors",
        // headers: {
        //   Authorization: bearer,
        //   'Content-Type': 'application/json',
        // },
      }
    )
      // .then((response) => response.json())
      // .then(({ appState }) => {
      //   console.log(appState);
      //   if (appState.registered) {
      //     redirect(appState.redirectUri);
      //   }
      // });
      .then((response) => {
        // HTTP 301 response
        // HOW CAN I FOLLOW THE HTTP REDIRECT RESPONSE?
        console.log({ response });
        if (response.redirected) {
          window.location.href = response.url;
        }
        return response.blob();
      })
      .then((resp) => console.log(resp))
      .catch((e) => console.log(e));

    // var myHeaders = new Headers();
    // myHeaders.append('Authorization', bearer);

    // fetch(URL, {
    //   method: 'GET',
    //   headers: myHeaders,
    //   redirect: 'follow',
    //   mode: 'no-cors',
    // })
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log('error', error));
  }, [props, redirect]);

  useEffect(() => {
    getRegister();
  }, [getRegister]);

  console.log(props);
  const handleLogin = async () => {
    // getRegister();
    window.location.replace(UBER_URL);
  };

  return (
    <div>
      <h1>Uber Login</h1>
      <button onClick={handleLogin}>Singin</button>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>home</h1>} />
        <Route path="int/uber" element={<UberHandleLogin aa="a"/>} />
        <Route path="*" element={<h1>404</h1>} />

      </Routes>
    </div>
  );
}

export default App;
