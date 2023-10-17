import Header from "../componenets/Header";

const { Outlet } = require("react-router-dom");

const RootLayout = (props) => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default RootLayout;
