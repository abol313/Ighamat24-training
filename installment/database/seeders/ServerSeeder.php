<?php

namespace Database\Seeders;

use App\Models\Server;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ServerSeeder extends Seeder
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
            'ali',
            'abol',
            'sama',
        ];

        foreach($names as $name){
            Server::create([
                'username' => $name,
                'password' => Hash::make('1234'),
            ]);
        }
    }
}
