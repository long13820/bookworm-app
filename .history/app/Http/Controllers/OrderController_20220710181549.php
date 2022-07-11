<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OrderController extends Controller
{
    function store(Request $request){
        DB::beginTransaction();
        try{

            $order = new Order();
            $order->order_number = uniqid('ORD.');
            $order->user_id = Auth::id();
            $order->item_count = 2;
            $order->grand_total = 20;
            $order->save();

            $items = json_decode($request->getContent(), true);

            foreach( $items as $item ){
                $orderItem = new OrderItem;
                $orderItem->order_id = $order->id;
                $orderItem->product_id = $item['product_id'];
                $orderItem->price = $item['price'];
                $orderItem->quantity = $item['quantity'];
                $orderItem->save();
            }
            DB::commit();
        }catch (\Exception $e ){
            DB::rollBack();
        }
        return response()->json(
            [
                'message' => "Placed order",
            ],
            201
        );
    }
}
