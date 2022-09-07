<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('services', function(Blueprint $table){
            $table->foreign('server_id')->references('id')->on('servers');
            $table->foreign('category_id')->references('id')->on('service_categories');
            $table->foreign('installment_condition_id')->references('id')->on('installment_conditions');

        });
        
        Schema::table('carts', function(Blueprint $table){
            $table->foreign('service_id')->references('id')->on('services');
            $table->foreign('customer_id')->references('id')->on('customers');

        });
        
        Schema::table('installments', function(Blueprint $table){
            $table->foreign('cart_id')->references('id')->on('carts');

        });

        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
