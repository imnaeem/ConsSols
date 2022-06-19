import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ loggedIn, children, type }) => {
  //const navigate = useNavigate();
  // console.log(loggedIn);
  return loggedIn ? (
    <>
      {loggedIn.result.type === type ? (
        children
      ) : (
        <Navigate to="/page-not-found" replace />
      )}
    </>
  ) : (
    <Navigate to="/user/signin" replace />
  );
};

export const AuthRoutes = ({ loggedIn, children, page }) => {
  //const navigate = useNavigate();

  let userType;
  if (loggedIn) {
    userType = loggedIn.result.type;
  }
  return loggedIn ? (
    <>
      {(page === "signin" ||
        page === "signup" ||
        page === "forget-password") && (
        <Navigate to={`/${userType}/dashboard`} replace />
      )}
    </>
  ) : (
    children
  );
};

export const CompaniesProjects = ({ loggedIn, children, page }) => {
  //const navigate = useNavigate();
  //console.log(loggedIn);
  let userType;
  if (loggedIn) {
    userType = loggedIn.result.type;
  }
  // console.log(userType);
  return loggedIn ? (
    <>
      {userType === "admin" ? (
        children
      ) : (
        <>
          {(userType === "company" && page === "projects") ||
          (userType === "client" && page === "companies") ? (
            children
          ) : (
            <Navigate to="/page-not-found" replace />
          )}
        </>
      )}
    </>
  ) : (
    children
  );
};
