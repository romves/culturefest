<?php

namespace Database\Seeders;

use App\Models\EventCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Jawa',
            'Tradisional',
            'West',
            'Modern',
        ];

        foreach ($categories as $category) {
            EventCategory::create([
                "name" => $category
            ]);
        }
    }
}
