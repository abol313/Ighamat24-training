<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\ServiceCategory;

class ServiceCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $categories = [
            'sport',
            'doctor',
            'wiring',
            'cleaning',
            'keeping',
            'seeding',
            'reading',
            'booking',
        ];

        foreach($categories as $category)
            ServiceCategory::create([
                'name' => $category
            ]);
    }
}
