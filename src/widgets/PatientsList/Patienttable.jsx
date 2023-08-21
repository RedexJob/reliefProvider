// styled components
import { Header } from "@components/Widget/style";
import {
  LetterNav,
  LetterNavWrapper,
  LetterNavItem,
  NavWrapper,
} from "./style";

// components
import Widget from "@components/Widget";
import WidgetBody from "@components/Widget/WidgetBody";
import GenderNav from "@components/GenderNav";
import MonthNavigator from "@ui/Navigator/MonthNavigator";
// import Group from './Group';
import NoDataPlaceholder from "@components/NoDataPlaceholder";

// utils
import { generateAlphabet } from "@utils/helpers";
import { nanoid } from "nanoid";
import moment from "moment";
// hooks
import { useState, useRef, useEffect } from "react";
import useGenderFilter from "@hooks/useGenderFilter";
import InfiniteScroll from "react-infinite-scroll-component";
// data placeholder
import { patients } from "@db/patients";
import axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Patienttable = () => {
  const contentRef = useRef(null);

  const [products, setProductData] = useState([]);
  const [hasMore, setHasMore] = useState(true); // For infinite scrolling
  const [currentPage, setCurrentPage] = useState(1); // For pagination

   console.log(products,'products========================')
  const itemsPerPage = 10; // Number of items per page
  useEffect(() => {
    // Fetch data from the API
   
    const token = JSON.parse(localStorage.getItem("token"));

    axios
      .get("https://medical.studiomyraa.com/api/get_patient", {
        headers: { Authorization: ` Bearer ${token}` },
      })
      .then((response) => {
        
         console.log(response.data.result,'rrrrrrrrrrrrrrrrrrr')
        if (response.data.result && Array.isArray(response.data.result)) {
          // Update the products state with the fetched data
          setProductData(response.data.result);
        } else {
          console.error("Invalid API response format:", response.data);
          setProductData([]);
        }
        // setProductData(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to fetch more data for infinite scrolling
  // const fetchMoreData = () => {
  //   // Implement your API call here to fetch the next set of data based on currentPage
  //   // Example:
  //   // const nextPage = currentPage + 1;
  //   // axios.get(`your-api-url?page=${nextPage}`).then((response) => {
  //   //   if (response.data && Array.isArray(response.data.data)) {
  //   //     // Update the products state with the new data
  //   //     setProductData((prevData) => [...prevData, ...response.data.data]);
  //   //     setCurrentPage(nextPage);
  //   //   } else {
  //   //     console.error("Invalid API response format:", response.data);
  //   //   }
  //   //   setHasMore(response.data.data.length > 0);
  //   // }).catch((error) => {
  //   //   console.error("Error fetching data:", error);
  //   // });

  //   // Since we don't have a real API call in this example, we'll simulate fetching more data after a delay.
  //   setTimeout(() => {
  //     const nextPage = currentPage + 1;
  //     const newData = Array.from({ length: itemsPerPage }, (_, index) => ({
  //       id: `new-${nanoid()}`,
  //       user_id: `User ${nextPage}-${index + 1}`,
  //       // ... (other properties)
  //     }));
  //     setProductData((prevData) => [...prevData, ...newData]);
  //     setCurrentPage(nextPage);
  //     setHasMore(nextPage < 5);
  //     // Assuming there are 5 pages in total
  //   }, 1000);
  // };

  return (
    <Widget name="PatientsList">
      <WidgetBody style={{ padding: 0 }} elRef={contentRef}>
        <div className="card-body">
          {/* <InfiniteScroll
            dataLength={products.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            scrollableTarget="content-container" // Replace "content-container" with the ID of the container that should have the scrolling behavior
          > */}
            <Table sx={{ minWidth: 650 }} className="table table-bordered">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: 150, maxWidth: "25%" }}>
                    <TableSortLabel active={false} direction="asc">
                      Patient ID
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel active={false} direction="asc">
                      Last Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>
                    <TableSortLabel active={false} direction="asc">
                      Middle Name 
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel active={false} direction="asc">
                     Created
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel active={false} direction="asc">
                      City,state
                    </TableSortLabel>
                  </TableCell>
                  {/* <TableCell>Actions</TableCell> */}
                </TableRow>
              </TableHead>

              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.lname}</TableCell>
                    <TableCell>
                     {product.name}
                    </TableCell>
                    <TableCell>
                    {product.mname}
                    </TableCell>
                    <TableCell>{moment(product.created_at).format("MM/DD/YYYY h:mm A")}</TableCell>
                    <TableCell>{product.city} / {product.state}</TableCell>
                    {/* <TableCell>
                      <Button variant="contained" color="success">
                        Add
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: "5px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        style={{ color: "red", marginLeft: "5px" }}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          {/* </InfiniteScroll> */}
          <br />
        </div>
      </WidgetBody>
    </Widget>
  );
};

export default Patienttable;
