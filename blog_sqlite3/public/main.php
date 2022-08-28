<?php
use App\Models\Post;

$postModel = new Post();

function strLimitLength(string $str,int $max,string $exceed="..."){
    $out = mb_substr($str, 0, $max);
    if(mb_strlen($str)>$max)
        $out = mb_substr($out, 0, -mb_strlen($exceed)) . $exceed;
    return $out;
}
?>

<ul>
    <?php foreach($postModel->all() as $record){ ?>
        <li>
            <h2><?= $record['title']?></h2>
            <p><?= strLimitLength($record['description'], 50) ?></p>
        </li>
    <?php } ?>
</ul>