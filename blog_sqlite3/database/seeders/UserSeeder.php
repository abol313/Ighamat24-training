<?php

use App\Models\User;

echo "seeding users...\n";

$userModel = new User();

for($i = 0; $i < 10; $i++){
    $userModel->create([
        'username'=> "name_$i",
        'password'=> "password_$i",
    ]);
}

echo "seeded users.\n";
