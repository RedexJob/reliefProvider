import Page from '@layout/Page';
import Findorder from '@widgets/ProductList/Findorder';
import { useNavigate } from 'react-router-dom';
import {
    Button,
  } from "@mui/material";
const Products = () => {
    const navigate = useNavigate();
    const ToProducts = () =>{
            
        navigate("/add_product")
    
      }
    return (
        // <Page title="View Product">
        //       <Button variant="contained" color="success">
         
        //                 Add
        //               </Button>
        //     <Findorder variant="doctor"/> 
        // </Page>

        <Page style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <br/>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ marginRight: "1rem" }}>View Product</h1>
        <Button variant="contained" color="success" 
          onClick={ToProducts}
        >Create </Button>
        <br/>
        <br/>
        <br/>
      </div>
      <Findorder variant="doctor" />
    </Page>
    )
}

export default Products;