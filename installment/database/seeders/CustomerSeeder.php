<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $names = [
            'sara',
            'sima',
            'mama',
        ];

        foreach($names as $name){
            Customer::create([
                'username' => $name,
                'password' => Hash::make('1234'),
            ]);
        }
    }
}
