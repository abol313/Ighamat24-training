<?php view("header");?>

<?php
use App\Models\Post;

$postModel = new Post();
?>

<ul>
    <?php foreach($postModel->all() as $post){ ?>
        <li>
            <a href="<?=route('posts.show', ['id'=>$post['id']])?>">
                <h2><?= $post['title']?></h2>
            </a>
            <p><?= strLimitLength($post['description'], 50) ?></p>
        </li>
    <?php } ?>
</ul>

<?php view("footer");?>
