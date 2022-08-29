<?php view("header");?>


<ul>
    <?php if($post){?>
    <li>
        <h2><?= $post['title']?></h2>
        <p><?= $post['description'] ?></p>
    </li>
    <?php }else{ ?>
        <h2>There is no same post !</h2>
    <?php } ?>
</ul>

<?php view("footer");?>
