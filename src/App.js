import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { PDFDownloadLink,StyleSheet } from "@react-pdf/renderer";
import UploadJSONFile from "./Page/UploadJSONFile";
import PDF from "./Page/PDF/PDF";
import MyPDF from "./Page/PDF/MyPDF";
import Forms from "./Form/Forms";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
  a: {
    backgroundColor: "grey",
    padding: "0.5rem",
    cursor: "pointer",
    textDecoration: "none",
    color: "white",
    borderRadius: "5px",
    marginTop: "auto",
    marginBottom: "0px",
  },
});

function App() {
const data = useSelector((state) => state); 

  return (
    <main>
      <Router>
        <Switch>
          <Route path="/" exact>
            <UploadJSONFile />
          </Route>
          <Route path="/pdf" exact>
            <PDF />
            <PDFDownloadLink
              document={<MyPDF data={data} />}
              style={styles.a}
              fileName="resume.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download now!"
              }
            </PDFDownloadLink>
          </Route>
          <Route path="/forms" exact>
            <Forms />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </main>
  );
}

export default App;
