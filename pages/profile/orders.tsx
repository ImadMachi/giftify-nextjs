import Layout from "@/components/profile/layout/Layout";
import Order from "@/models/Order";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import { ordersLinks } from "./../../components/profile/sidebar/ordersLinks";
import Link from "next/link";
import Image from "next/image";
import { CheckBadgeIcon, EyeIcon, XCircleIcon  } from "@heroicons/react/24/solid";
import slugify from "slugify";
import { useRouter } from "next/dist/client/router";
import { PauseIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ClassNames } from "@emotion/react";


const Orders = ({ user, tab, orders }: any) => {
    const router = useRouter();
const handleClickk = async (orderId) => {
    try {
        const deletedOrder = await deleteOrders(orderId);
        console.log('id importer',orderId)
        console.log('Ordre supprimé :', deletedOrder);
        // Faire quelque chose après la suppression de l'ordre
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'ordre :', error);
    }
};

    const update = (orderId) => {
        deleteOrders(orderId)
            .then(deletedOrder => {
                console.log('id importer',orderId)
                console.log('Ordre supprimé :', deletedOrder);
            })

    };
    return (
        < >
            <Layout user={user} tab={tab} title={`${user.name}'s Orders`} ClassNames="flex flex-col md:flex-row">
                <div className="text-center ">
                   
                   <div> <h2 className="text-4xl font-bold mb-6">My Orders</h2>
                    <nav>
                        <ul className="flex">
                            {ordersLinks.map((order: any, i: any) => (
                                <li className={`${router.query?.q?.split("__")[0] == slugify(order.name, {lower:true})  ? 'font-bold border-b' : '' } px-1 flex items-center justify-center hover:font-bold hover:border-b`} key={i}>
                                    <Link href={`/profile/orders?tab=${tab}&q=${slugify(order.name,{lower: true,})}__${order.filter}`}>{order.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    </div>

                    <table className="table_order">
                        <thead>
                            <tr>
                                <td>Order id</td>
                                <td>Products</td>
                                <td>Payment Method</td>
                                <td>Total</td>
                                <td>Paid</td>
                                <td>Status</td>
                                <td>View</td>
                                <td>update</td>
                                <td>delete</td>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order: any, i: any) => (
                                <tr key={i}>
                                    <td>{order._id}</td>
                                    <td className="flex">
                                        {order.products.map((p: any) => (
                                            <Image
                                                key={p._id}
                                                src={p.image}
                                                alt={p.name}
                                                width={50}
                                                height={50}
                                                className="rounded-full mx-1"
                                            />
                                        ))}
                                    </td>
                                    <td>{order.paymentMethod}</td>
                                    <td>{order.total}$</td>
                                    <td>
                                        {order.isPaid == true ? (
                                            <CheckBadgeIcon className="w-8 h-8 fill-green-500" />
                                        ) : (
                                            <XCircleIcon className="w-8 h-8 fill-red-500" />
                                        )}
                                    </td>
                                    <td>{order.status}</td>
                                    <td><Link href={`/order/${order._id}`}><EyeIcon className="w-8 h-8 fill-slate-500 cursor-pointer hover:fill-slate-800" /></Link></td>
                                    <td><a  ><PencilIcon className="w-8 h-8 fill-slate-500 cursor-pointer hover:fill-slate-800" /></a></td>
                                    <td><a  onClick={ ()=>handleClickk(order._id)}><TrashIcon className="w-8 h-8 fill-slate-500 cursor-pointer hover:fill-slate-800" /></a></td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Layout>
        </>
    );
};

export default Orders;



   // Fonction pour supprimer un ordre par son ID
   const deleteOrders = async (orderId) => {
    try {        const deletedOrder = await Order.findOneAndDelete({_id: orderId });
        return deletedOrder;
    } catch (error) {
        // Gérer les erreurs
        console.error("Erreur lors de la suppression de l'ordre :", error);
        
    }
};
export async function getServerSideProps(context: any) {
    db.connectDb();
    const { query } = context;
    const session = await getSession(context);
    const tab = query.tab || 0;

    if (!session) {
        return {
            redirect: {
                destination: "/",
            },
        };
    }
    // --------------------------------
    const filter = query.q ? query.q.split("__")[1] : null; // Vérifier si query.q existe avant de diviser

    let orders = [];

    if (!filter) {
        orders = await Order.find({ user: session.user?.id })
            .sort({ createdAt: -1 })
            .lean();
    } else if (filter == "paid") {
        orders = await Order.find({ user: session.user?.id, isPaid: true })
            .sort({ createdAt: -1 })
            .lean();
    } else if (filter == "unpaid") {
        orders = await Order.find({ user: session.user?.id, isPaid: false })
            .sort({ createdAt: -1 })
            .lean();
    } else {
        orders = await Order.find({ user: session.user?.id, status: filter })
            .sort({ createdAt: -1 })
            .lean();
    }
    db.disconnectDb();
    // console.log("filter", filter, "orders > ", orders);
    return {
        props: {
            user: session.user,
            tab,
            orders: JSON.parse(JSON.stringify(orders)),
        },
    };
}
