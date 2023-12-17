// components/admin/pack/PackCard.tsx

import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

const PackCard = ({ pack }: any) => {
  const router = useRouter();

  const handleViewPack = () => {
    // Navigate to the pack details page or open a modal
    router.push(`/admin/pack/${pack._id}`);
  };

  return (
    <div className="flex flex-col w-60 m-2 p-2 border rounded hover:shadow hover:bg-slate-100 transition">
      <h3 className="text-sm font-semibold">{pack.name}</h3>
      <p className="text-xs mb-2">{pack.offer}</p>

      <div className="mt-5 text-xs flex mx-auto">
        <Button variant="contained" onClick={handleViewPack}>
          View Pack
        </Button>
      </div>
    </div>
  );
};

export default PackCard;
