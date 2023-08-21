// styling
import styled from "styled-components/macro";
import { flex, breakpoints } from "@styles/vars";

// styled components
import { Header } from "@components/Widget/style";
import { nanoid } from "nanoid";
import axios from "axios";
// components
import Widget from "@components/Widget";
import WidgetBody from "@components/Widget/WidgetBody";
import CustomSelect from "@ui/Select";
import GenderNav from "@components/GenderNav";
import SearchBar from "@ui/SearchBar";
import Group from "./Group";
import NoDataPlaceholder from "@components/NoDataPlaceholder";
import moment from "moment";
// utils
import { depsOptions } from "@constants/options";
import { useState, useEffect } from "react";

// hooks
import useGenderFilter from "@hooks/useGenderFilter";

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

// data placeholder
import { staff } from "@db/staff";

export const ListHeader = styled(Header)`
  padding: 24px 0 20px;

  .wrapper {
    padding: 0 24px;
    ${flex.col};
    gap: 20px;
  }

  .wrapper,
  form {
    flex-grow: 1;
    width: 100%;
  }

  ${breakpoints.tablet} {
    .wrapper {
      flex-direction: row;
      ${flex.between};

      .gender {
        width: 300px;
      }
    }
  }
`;

const OrderView = ({ variant }) => {
  const [category, setCategory] = useState(depsOptions[0]);
  const [search, setSearch] = useState("");
  const { gender, setGender } = useGenderFilter();

  const filteredStaff = staff.filter((item) => {
    const name = `${item.firstName} ${item.lastName}`;
    const depsNames = item.department.map((dep) => dep.label).join(" ");
    const depsIDs = item.department.map((dep) => dep.id).join(" ");
    const queryMatch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      depsNames.toLowerCase().includes(search.toLowerCase());
    const categoryMatch =
      category.value === "all" ||
      depsIDs.toLowerCase().includes(category.value.toLowerCase());
    const genderMatch = gender.value === "all" || item.gender === gender.value;

    return queryMatch && categoryMatch && genderMatch;
  });

  const [products, setProductData] = useState([]);
  const [hasMore, setHasMore] = useState(true); // For infinite scrolling
  const [currentPage, setCurrentPage] = useState(1); // For pagination

  console.log(products, "order view========================");
  const itemsPerPage = 10; // Number of items per page
  useEffect(() => {
    // Fetch data from the API
    const token = JSON.parse(localStorage.getItem("token"));

    axios
      .get("https://medical.studiomyraa.com/api/view_order_in_provider/1", {
        headers: { Authorization: ` Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data.result, "rrrrrrrrrrrrrrrrrrr");
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
  const fetchMoreData = () => {
    // Implement your API call here to fetch the next set of data based on currentPage
    // Example:
    // const nextPage = currentPage + 1;
    // axios.get(`your-api-url?page=${nextPage}`).then((response) => {
    //   if (response.data && Array.isArray(response.data.data)) {
    //     // Update the products state with the new data
    //     setProductData((prevData) => [...prevData, ...response.data.data]);
    //     setCurrentPage(nextPage);
    //   } else {
    //     console.error("Invalid API response format:", response.data);
    //   }
    //   setHasMore(response.data.data.length > 0);
    // }).catch((error) => {
    //   console.error("Error fetching data:", error);
    // });

    // Since we don't have a real API call in this example, we'll simulate fetching more data after a delay.
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const newData = Array.from({ length: itemsPerPage }, (_, index) => ({
        id: `new-${nanoid()}`,
        user_id: `User ${nextPage}-${index + 1}`,
        // ... (other properties)
      }));
      setProductData((prevData) => [...prevData, ...newData]);
      setCurrentPage(nextPage);
      setHasMore(nextPage < 5);
      // Assuming there are 5 pages in total
    }, 1000);
  };

  return (
    <Widget name="DoctorsList">
      <ListHeader style={{ padding: 18 }}>
        {/* <div className="wrapper">
          <CustomSelect
            options={depsOptions}
            variant="minimal"
            value={category}
            changeHandler={setCategory}
          />
          <GenderNav state={gender} handler={setGender} />
        </div> */}
        {/* <SearchBar
          placeholder="Search orders.."
          handler={setSearch}
          value={search}
        /> */}
      </ListHeader>
      <WidgetBody style={{ padding: 18 }}>
        {/* {
                    filteredStaff.length !== 0 ?
                        <Group arr={filteredStaff} variant={variant} gender={gender.value} deps={{
                            category: category.value,
                            search: search}}/>
                        :
                        <NoDataPlaceholder/>
                } */}

        <div className="card-body">
          {/* <h3>Products</h3> */}

          {/* <p>5 total products found</p> */}

          <Table sx={{ minWidth: 650 }} className="table table-bordered">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: 150, maxWidth: "25%" }}>
                  <TableSortLabel active={false} direction="asc">
                    Order ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel active={false} direction="asc">
                    Created
                  </TableSortLabel>
                </TableCell>
                <TableCell>Patient</TableCell>
                <TableCell>
                  <TableSortLabel active={false} direction="asc">
                    Amount
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel active={false} direction="asc">
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel active={false} direction="asc">
                    Last Updated
                  </TableSortLabel>
                </TableCell>
                {/* <TableCell>Actions</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.order_id}</TableCell>
                  <TableCell>
                    {moment(product.created_at).format("MM/DD/YYYY h:mm A")}
                  </TableCell>
                  <TableCell>
                    {product.first_name} {product.last_name}
                  </TableCell>
                  <TableCell>{product.total_amount}</TableCell>
                  <TableCell>{product.status}</TableCell>
                  <TableCell>
                    {moment(product.updated_at).format("MM/DD/YYYY h:mm A")}
                  </TableCell>
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
          <br />
        </div>
      </WidgetBody>
    </Widget>
  );
};

export default OrderView;
