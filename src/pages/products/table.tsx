
import React, { useContext, useState, useEffect } from 'react';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ProductContext } from './ProductContext.jsx';

function ProductsTable() {
  const { businessIds } = useContext(ProductContext);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (businessIds.length > 0) {
        try {
          const businessId = businessIds[0]; // Assuming there's only one business ID
          const response = await fetch(
            `https://yummycodicon.azurewebsites.net/${businessId}/products`
          );
          const data = await response.json();
          setTableData(data);
        } catch (error) {
          console.error('Error fetching products data:', error);
        }
      }
    };

    fetchProducts();
  }, [businessIds]);

  const renderTableData = () => {
    return tableData.map((row) => (
      <TableRow key={row.id}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.price}</TableCell>
        <TableCell align="right">{row.isVegan ? 'Yes' : 'No'}</TableCell>
        <TableCell align="right">{row.isFit ? 'Yes' : 'No'}</TableCell>
        <TableCell align="right">{row.nutritionFact.totalCalories}</TableCell>
        <TableCell align="right">{row.nutritionFact.totalFat}</TableCell>
        <TableCell align="right">{row.nutritionFact.totalCarbohydrates}</TableCell>
        <TableCell align="right">{row.nutritionFact.totalProtein}</TableCell>
        <TableCell align="center">
          <IconButton onClick={() => handleDelete(row)}>
            <DeleteIcon />
          </IconButton>
          <IconButton>
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  };

  const handleDelete = (product) => {
    // Implement the delete logic
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Is Vegan</TableCell>
              <TableCell align="right">Is Fit</TableCell>
              <TableCell align="right">Total Calories</TableCell>
              <TableCell align="right">Total Fat</TableCell>
              <TableCell align="right">Total Carbohydrates</TableCell>
              <TableCell align="right">Total Protein</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableData()}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ProductsTable;



