// pages/admin/pack/index.tsx
import { useState } from "react";
import Layout from "@/components/admin/layout/Layout";
import axios from "axios";
import PackCard from "@/components/admin/packs/PackCard";

const Packs = ({ packs }: any) => {
  const [packList, setPackList] = useState(packs);

  return (
    <Layout>
      <div className="my-4">
        <div className="flex p-2 border-b pb-1 font-semibold">All Packs</div>
        <div className="flex flex-wrap">
          {packList.map((pack: any, i: number) => (
            <PackCard key={i} pack={pack} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Packs;

export const getServerSideProps = async (ctx: any) => {
  try {
    const response = await axios.get("/api/admin/pack"); // Assuming you have an endpoint to get all packs
    const packs = response.data;

    return {
      props: {
        packs: JSON.parse(JSON.stringify(packs)),
      },
    };
  } catch (error) {
    console.error("Error fetching packs:", error);
    return {
      props: {
        packs: [],
      },
    };
  }
};
