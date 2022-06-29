<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->timestamp('order_date');
            $table->decimal('order_amount', 8, 2, true);
            $table->foreignId('user_id')->constrained('users');
            $table->timestamp('paidAt');
            $table->timestamp('deliveredAt');
            $table->boolean('isPaid')->default(false);
            $table->boolean('isDelivered')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
