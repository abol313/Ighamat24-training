<?php

namespace Database\Seeders;

use App\Models\InstallmentCondition;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InstallmentConditionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        InstallmentCondition::factory(80)->create();
    }
}
