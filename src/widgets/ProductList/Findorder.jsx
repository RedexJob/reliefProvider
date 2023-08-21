// styled components
import { Header } from "@components/Widget/style";
import {
  LetterNav,
  LetterNavWrapper,
  LetterNavItem,
  NavWrapper,
} from "./style";
import { useNavigate } from 'react-router-dom';

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

const Findorder = () => {

  const navigate = useNavigate();
  const contentRef = useRef(null);

  const [products, setProductData] = useState([]);
  const [hasMore, setHasMore] = useState(true); // For infinite scrolling
  const [currentPage, setCurrentPage] = useState(1); // For pagination

   console.log(products,'products========================')
  const itemsPerPage = 10; // Number of items per page
  useEffect(() => {
    // Fetch data from the API
   
    const items = JSON.parse(localStorage.getItem("token"));

    axios
      .get("https://medical.studiomyraa.com/api/view_product", {
        headers: { Authorization: ` Bearer ${items}` },
      })
      .then((response) => {
        if (response.data && Array.isArray(response.data.data)) {
          // Update the products state with the fetched data
          setProductData(response.data.data);
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
  //     setHasMore(nextPage < 5); // Assuming there are 5 pages in total
  //   }, 1000);
  // };


  const DeleteData = async (id) => {
    let person = prompt(
      "Are you sure you want to delete this coupon!! then type - YES",
      "YES"
    );
  
    if (person === "YES" || person === "yes") {
      // Delete API call
      const providerCompanyId = 1; // Replace with the actual provider_company_id
      const name = "Coupon Name"; // Replace with the actual coupon name
      const length = 10; // Replace with the actual length
  
  
      const token = JSON.parse(localStorage.getItem("token"));
      // Create a new FormData and append the parameters as URL parameters
      const formData = new FormData();
      formData.append("provider_company_id", providerCompanyId);
      formData.append("name", name);
      formData.append("length", length);
  
      try {
        const response = await axios.delete(
          `https://medical.studiomyraa.com/api/delete_product/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: formData,
          }
        );
  
        // Handle the API response here if needed
        console.log(response.data);
        alert("Deleted successfully!"); // Show success message to the user
      } catch (error) {
        // Handle errors if the API call fails
        console.error(error);
        alert("An error occurred while deleting the coupon."); // Show error message to the user
      }
    } else {
      alert("Cancel");
    }
  };

  const ToProducts = () =>{
            
    navigate("/add_product")

  }
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
                      Product ID
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel active={false} direction="asc">
                      POS ID
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Thumb</TableCell>
                  <TableCell>
                    <TableSortLabel active={false} direction="asc">
                      Product
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel active={false} direction="asc">
                      Product Type
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel active={false} direction="asc">
                      Price
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.user_id}</TableCell>
                    <TableCell>{product.pos_id}</TableCell>
                    <TableCell>
                      <img src={product.img} alt="Product Thumb" />
                    </TableCell>
                    <TableCell>
                      <span style={{ fontWeight: 600 }}>{product.name}</span>
                      <p style={{ fontSize: "0.8em", color: "#676767" }}>
                        <b>Description: </b> {product.description}
                      </p>
                    </TableCell>
                    <TableCell>{product.product_type}</TableCell>
                    <TableCell>{product.amount}</TableCell>
                    <TableCell>
                      {/* <Button variant="contained" color="success"

                       onClick={ToProducts}
                        >
                        Add
                      </Button> */}
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
                        onClick={ () => DeleteData(product.id)}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </TableCell>
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

export default Findorder;
