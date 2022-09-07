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
        for($i=0 ; $i<20 ; $i++){

            InstallmentCondition::create([
                'maximum' => random_int(1e6,1e10),
                'installments_count' => random_int(1,20),
            ]);
        }
    }
}
