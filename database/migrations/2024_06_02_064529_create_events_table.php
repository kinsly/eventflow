<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->softDeletes();

            $table->string('name');
            $table->string('description')->nullable();
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();
            $table->boolean('all_day')->default(true);
            $table->boolean('completed')->default(false);

            $table->integer('cost')->nullable(); 
            $table->string('telephone_1', 20)->nullable(); 
            $table->string('telephone_2', 20)->nullable(); 

            $table->unsignedBigInteger('event_day_id');
            $table->foreign('event_day_id')->references('id')->on('event_days');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
