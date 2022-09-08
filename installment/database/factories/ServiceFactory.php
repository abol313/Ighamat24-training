<?php

namespace Database\Factories;

use App\Models\Server;
use App\Models\ServiceCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            //
            'title' => $this->faker->jobTitle(),
            'description' => $this->faker->realTextBetween(),
            'category_id' => ServiceCategory::all()->random()['id'],
            'server_id' => Server::all()->random()['id'],
            'unit' => $this->faker->randomElement(['cm','mm','nm','um','tooth','m2','km','lit','kg','g']),
            'price_per_unit' => $this->faker->numberBetween(1e2, 1e3),
        ];
    }
}
