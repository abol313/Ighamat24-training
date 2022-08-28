<?php

use App\Models\Post;

echo "seeding posts...\n";

$postModel = new Post();

for($i = 0; $i < 10; $i++){
    $postModel->create([
        'title'=> "title_$i",
        'description'=> str_repeat("description_$i ",10),
    ]);
}

echo "seeded posts.\n";
