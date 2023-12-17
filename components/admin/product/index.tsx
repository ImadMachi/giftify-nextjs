import { Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

const AllProduct = ({ products, setProducts }: any) => {
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  

  const handleDeleteClick = (productId: string) => {
    setDeleteProductId(productId);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Assuming you have an API endpoint for deleting products
      await axios.delete(`/api/admin/product/product?name=${deleteProductId}`);

      // Update the product list locally without fetching again
      setProducts((prevProducts: any) =>
        prevProducts.filter((product: any) => product.name !== deleteProductId)
      );

      // After deleting, close the dialog
      setOpenDialog(false);
      setDeleteProductId(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdateClick = (productId: string) => {
    // Add your update logic here
    console.log(`Update product with ID: ${productId}`);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDeleteProductId(null);
  };

  return (
    <div className="my-4">
      <div className="flex p-2 border-b pb-1 font-semibold">All Product</div>
      <div className="flex flex-wrap">
        {products.map((product: any, i: number) => {
          let created = new Date(product.createdAt);
          return (
            <div className="flex flex-col w-60 m-2 p-2 border rounded hover:shadow hover:bg-slate-100 transition" key={i}>
              <div className="relative w-58 h-72">
                <Image
                  className="object-contained"
                  fill
                  src={product.subProducts[0].images[0].url}
                  alt={product.name}
                />
              </div>
              <Link href={`http://localhost:3000/product/${product.slug}`} target="_blank">
                <h3 className="text-sm font-semibold">{product.name}</h3>
              </Link>
              <div className="mt-2 text-xs flex flex-col">
                <div>Sku: {product.subProducts[0].sku}</div>
                <div>Category: {product.category.name}</div>
                <div>Created: {`${created.getFullYear()}-${created.getMonth()}-${created.getDate()}`}</div>
              </div>
              <div className="mt-5 text-xs flex space-x-4 mx-auto">
                <Button variant="contained" onClick={() => handleDeleteClick(product.name)}>
                  Delete
                </Button>
                <Button variant="contained" onClick={() => handleUpdateClick(product.name)}>
                  Update
                </Button>
              </div>
              <div className="mt-2 text-xs flex mx-auto">
                <Button variant="contained">Add to pack</Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllProduct;
