// components/admin/product/AddToPackDialog.tsx

import { Button, Dialog, DialogTitle, DialogActions, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const AddToPackDialog = ({ open, onClose, onAddToPack }: any) => {
  const [selectedPack, setSelectedPack] = useState("");
  const [packs, setPacks] = useState([]); // State to store the list of packs

  const handleAddToPack = async () => {
    // Call the API to add the product to the selected pack
    await axios.post(`/api/admin/pack/${selectedPack}/add`, { productId: "YOUR_PRODUCT_ID" }); // Replace with the actual product ID
    onAddToPack();
    onClose();
  };

  const handleClose = () => {
    setSelectedPack("");
    onClose();
  };

  // Fetch the list of packs when the dialog is opened
  React.useEffect(() => {
    const fetchPacks = async () => {
      try {
        const response = await axios.get("/api/admin/pack");
        setPacks(response.data);
      } catch (error) {
        console.error("Error fetching packs:", error);
      }
    };

    if (open) {
      fetchPacks();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add to Pack</DialogTitle>
      <FormControl fullWidth>
        <InputLabel id="pack-select-label">Select Pack or Create a New One</InputLabel>
        <Select
          labelId="pack-select-label"
          id="pack-select"
          value={selectedPack}
          onChange={(e) => setSelectedPack(e.target.value as string)}
        >
          <MenuItem value="">Create New Pack</MenuItem>
          {packs.map((pack: any) => (
            <MenuItem key={pack._id} value={pack._id}>
              {pack.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Cancel
        </Button>
        <Button onClick={handleAddToPack} variant="contained">
          Add to Pack
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToPackDialog;
