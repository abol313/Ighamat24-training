<?php view("header");?>

<?php
use App\Models\Post;

$postModel = new Post();

?>

<ul>
    <?php foreach($postModel->all() as $record){ ?>
        <li>
            <h2><?= $record['title']?></h2>
            <p><?= strLimitLength($record['description'], 50) ?></p>
        </li>
    <?php } ?>
</ul>

<?php view("footer");?>
