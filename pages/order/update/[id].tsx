import Payment from "@/components/order/Payment";
import Header from "@/components/Header/Header";
import OrderInfo from "@/components/order/OrderInfo";
import Product from "@/components/order/Product";
import Total from "@/components/order/Total";
import UserInfo from "@/components/order/UserInfo";
import { useEffect, useState } from "react";
import DotLoaderSpinner from "@/components/loaders/dotLoader/DotLoaderSpinner";
    import { useRouter } from 'next/router';
import Order from "@/models/Order";
    
  
    
    const OrderPage = ({ orderData }: any) => {
      const router = useRouter();
      const [order ,setOrder] = useState(orderData);
      const [loading, setLoading] = useState(false);
       // Utilisez useEffect pour mettre à jour l'état local lorsque les données changent
  useEffect(() => {
    setOrder(orderData);
    console.log("Props du aprees fetching:::", orderData);

  }, [orderData]);
      // Dans votre composant
console.log("Props du composant", orderData);
     const updatedMethode= async ()=>{
      try{
       const res =await Order.updateOrder(order).then( );
        console.log("resultat apres avoir updater",res) 
      router.push(`/order/${order._id}`)
      }catch( error ){
        console.log(error)
      }
    }
    return (
        <>
        {
            loading && (
                <DotLoaderSpinner loading={loading} />
            )
        }
            <Header title="Full Amazon Clone React" />
            <main className="max-w-screen-2xl mx-auto bg-gray-100 grid grid-cols-3 md:px-10 pt-5 pb-8 gap-8">
                <section className="col-span-2 bg-white p-2 md:p-5 rounded-xl border">
  
                 <label className="text-bold text-2xl md:ml-4 ">Update Your Order:</label>

    <div className="w-full max-w-xl">
      <div className="bg-white px-8 pt-6 pb-8 mb-4 flex flex-col space-y-2 md:w-full">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
          order  Status
          </label>
          <select
  id="status"
  name="status"
  value={order?.status}
  onChange={(e) => setOrder({ ...order, status: e.target.value })}
  className="shadow  py-3 appearance-none border rounded w-full  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
>
  <option value="Not Processed">Not Processed</option>
  <option value="Processing">Processing</option>
  <option value="Dispatched">Dispatched</option>
  <option value="Cancelled">Cancelled</option>
  <option value="Completed">Completed</option>
</select>

        </div>
 <div className="mb-4">
 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
 payment Method
          </label>

<select
  id="paymentMethod"
  name="paymentMethod"
  value={order?.paymentMethod}
  onChange={(e) => setOrder({ ...order, paymentMethod: e.target.value })}
  className="shadow  py-3 appearance-none border rounded w-full  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
>
  <option value="Not Processed">Cash</option>
  <option value="Processing">Creadit cart</option>
  <option value="Dispatched">Paypal</option>
</select>
</div>
<div className="mb-4">
 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
 total
          </label>
<input
  type="text"
  id="total"
  name="total"
  disabled
  value={order?.total}
  onChange={(e) => setOrder({ ...order, total: Number(e.target.value) })}
  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
/>
</div>
<div className="mb-4">
 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
 shipping Price          </label>
<input
  type="number"
  id="shippingPrice"
  name="shippingPrice"
  disabled
  value={order?.shippingPrice}
  onChange={(e) => setOrder({ ...order, shippingPrice: Number(e.target.value) })}
  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
/>
</div>
        <div className="flex items-center justify-center ">
          <button
            className="bg-amazon-blue_light hover:bg-blue-700 text-white font-bold mt-6  py-2 px-4 text-xl rounded focus:outline-none focus:shadow-outline"
            onClick={updatedMethode}
          >
            Update
          </button>
        </div>
      </div>
    </div>
                </section>
              
            </main>
        </>
    );
};

export default OrderPage;

export async function getServerSideProps(context: any) {
    const { params } = context;
    console.log("ID récupéré :", params);
    const id = params.id;
    const orderData = await Order.findById(id).populate("user").lean();
   console.log("order pour update",orderData)
    return {
        props: {
          orderData: JSON.parse(JSON.stringify(orderData)),
        },
    };
}
