import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/User";
import Cart from "../../../models/Cart";
import Order from "../../../models/Order";
import auth from "../../../middleware/auth";

const handler = nc().use(auth);

handler.delete(async (req, res) => {
    try {
        db.connectDb;
        // Assuming you are getting the order ID from the request body
        const { orderId } = req.body

        // Perform the deletion
        const deletedOrder = await Order.findByIdAndDelete(orderId);

        db.disconnectDb();

        if (deletedOrder) {
            return res.json({ message: 'Order deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default handler;
