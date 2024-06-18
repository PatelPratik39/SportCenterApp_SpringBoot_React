import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../app/api/api";
import Spinner from "../../app/layout/Spinner";
import { Order } from '../../app/models/order';

export default function Order() {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.Orders.list()
            .then(orders => setOrders(orders))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Spinner message="Loading orders..." />

    // // Function to convert order date to formatted string
    // function formatDate(orderDateArray: any) {
    //     if (!Array.isArray(orderDateArray) || orderDateArray.length < 3) {
    //         return "Invalid Date";
    //     }

    //     const [year, month, day] = orderDateArray;
    //     const formattedDate = `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;
    //     return formattedDate;
    // }

    // Function to convert order date to formatted string
    function formatDate(orderDateString: string) {
        const date = new Date(orderDateString);
        if (isNaN(date.getTime())) {
            return "Invalid Date";
        }

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Order Date</TableCell>
                        <TableCell align="right">Order Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map((order) => (
                        <TableRow
                            key={order.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {order.id}
                            </TableCell>
                            <TableCell align="right">{order.total}</TableCell>
                            <TableCell align="right">{formatDate(order.orderDate)}</TableCell>
                            <TableCell align="right">{order.orderStatus}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}