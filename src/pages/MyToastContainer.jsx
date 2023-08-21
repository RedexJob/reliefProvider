import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyToastContainer() {
  return <ToastContainer
   position="top-right"
   autoClose={1000}
   hideProgressBar={false}
   theme="light"
    />;
}

export default MyToastContainer;
