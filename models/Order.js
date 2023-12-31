import mongoose from "mongoose";


const { ObjectId } = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        products: [
            {
                product: {
                    type: ObjectId,
                    ref: "Product",
                },
                name: {
                    type: String,
                },
                image: {
                    type: String,
                },
                size: {
                    type: String,
                },
                qty: {
                    type: Number,
                },
                color: {
                    color: String,
                    image: String,
                },
                price: {
                    type: Number,
                },
                price: {
                    type: Number,
                },
                price: {
                    type: Number,
                },
            },
        ],
        shippingAddress: {
            firstName: {
                type: String,
            },
            lastName: {
                type: String,
            },
            phoneNumber: {
                type: String,
            },
            address1: {
                type: String,
            },
            address2: {
                type: String,
            },
            city: {
                type: String,
            },
            state: {
                type: String,
            },
            zipCode: {
                type: String,
            },
            country: {
                type: String,
            },
        },
        paymentMethod: {
            type: String,
        },
        paymentResult: {
            id: String,
            status: String,
            email: String,
        },
        total: {
            type: Number,
            required: true,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        total: {
            type: Number,
            required: true,
        },
        totalBeforeDiscount:{
            type: Number,
        },
        couponApplied:{
            type: String,
        },
        taxPrice: {
            type: Number,
            default: 0,
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        status: {
            type: String,
            default: "Not Processed",
            enum: [
                "Not Processed",
                "Processing",
                "Dispatched",
                "Cancelled",
                "Completed",
            ],
        },
        paidAt: {
            type: Date,
        },
        deliveredAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }

);


OrderSchema.methods.deleteOrderById = async function(order) {
    return this.deleteOne({_id: order._id}).exec();
};
OrderSchema.statics.updateOrder =  function(order) {
   
    return  this.updateOne({ _id: order._id }, 
        { $set: { paymentMethod: order.paymentMethod, status:order.status } });
};

const Order = mongoose.models?.Order  || mongoose.model("Order", OrderSchema);

export default Order;
