import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios";
import { useState } from 'react';
import { Product } from "../../app/models/Product";

export default function ProductDetails() {
  const {id} = useParams<{id: string}>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
    .then(response => setProduct(response.data))
    .catch(error => console.log(error))
    .finally(()=> setLoading(false))
  },[id])

  // loading ? <h3>Loading...</h3> : <h3>{''}</h3>

  if(loading) return <h3>Loading...</h3>

  if(!product) return <h3>Product not found</h3>



  return (
    <Grid container spacing={6} >
      <Grid item xs={8} md={6} lg={5} >
        <img src={product.pictureUrl} alt={product.name} style={{width: "70%"}} />
      </Grid>
      <Grid item md={5} lg={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{mb: 3}}/>
        <Typography variant="h4" color="secondary" >${(product.price / 100).toFixed(2)}</Typography>
        <TableContainer >
          <Table>
            <TableBody>
                <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>QuantityInStock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}
