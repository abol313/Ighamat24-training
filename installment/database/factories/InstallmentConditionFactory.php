<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InstallmentCondition>
 */
class InstallmentConditionFactory extends Factory
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
            'maximum' => $this->faker->numberBetween(1e2, 1e5),
            'installments_count' => $this->faker->numberBetween(2, 20),
            'service_id' => Service::all()->random()['id'],
        ];
    }
}
