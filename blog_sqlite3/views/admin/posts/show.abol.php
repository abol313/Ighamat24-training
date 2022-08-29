<?php view("admin.header");?>


<ul>
    <?php if($post){?>
    <li>
        <h2><?= $post['title']?></h2>
        <p><?= $post['description'] ?></p>
        <a href="<?=route('admin.posts.edit', ['id'=>$post['id']])?>">Edit</a>
        <a href="<?=route('admin.posts.destroy', ['id'=>$post['id']])?>">Delete</a>
    </li>
    <?php }else{ ?>
        <h2>There is no same post !</h2>
    <?php } ?>
</ul>

<?php view("footer");?>
