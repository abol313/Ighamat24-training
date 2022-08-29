<?php view("admin.header");?>


<ul>
    <li>
        <h2><?= $post['title']?></h2>
        <p><?= $post['description'] ?></p>
        <a href="<?=route('admin.posts.edit', ['id'=>$post['id']])?>">Edit</a>
        <a href="<?=route('admin.posts.delete', ['id'=>$post['id']])?>">Delete</a>
    </li>
</ul>

<?php view("footer");?>
