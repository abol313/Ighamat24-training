<?php

use App\Models\Admin;

echo "seeding admins...\n";

$adminModel = new Admin();

for($i = 0; $i < 10; $i++){
    $adminModel->create([
        'username'=> "name_$i",
        'password'=> "password_$i",
    ]);
}

echo "seeded admins.\n";
