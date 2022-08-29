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
            <a href="<?=route('admin.posts.edit', ['id'=>$post['id']])?>">Edit</a>
            <a href="<?=route('admin.posts.destroy', ['id'=>$post['id']])?>">Delete</a>
        </li>
    <?php } ?>
</ul>

<?php view("footer");?>
