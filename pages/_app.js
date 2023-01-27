import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons/css/boxicons.min.css";
import "../styles/app.scss";

// layout
import Public from "../layouts/Public";
import Admin from "../layouts/Admin";
import NoLayout from "../layouts/NoLayout";

const layouts = {
  Public,
  Admin,
  NoLayout,
};
const App = ({ Component, pageProps }) => {
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};
export default App;
