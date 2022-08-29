<?php view("admin.header");?>

<?php
use App\Models\Post;

$postModel = new Post();

?>

<ul>
    <?php foreach($postModel->all() as $post){ ?>
        <li>
            <h2><?= $post['title']?></h2>
            <p><?= $post['description'] ?></p>
        </li>
    <?php } ?>
</ul>

<?php view("footer");?>
