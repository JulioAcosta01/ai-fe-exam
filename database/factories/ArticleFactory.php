<?php

namespace Database\Factories;

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'image' => $this->faker->imageUrl(),
            'title' => $this->faker->sentence,
            'link' => $this->faker->url,
            'date' => $this->faker->date,
            'content' => $this->faker->paragraph,
            'status' => $this->faker->randomElement(['For Edit', 'Published']),
            'writer_id' => User::factory()->create(['type' => 'Writer'])->id,
            'editor_id' => User::factory()->create(['type' => 'Editor'])->id,
            'company_id' => Company::factory()->create()->id,
        ]; 
    }
}
