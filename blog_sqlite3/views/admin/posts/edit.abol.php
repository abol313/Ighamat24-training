<form action="<?=route('admin.posts.update')?>">

    <input type="hidden" name="id" value="<?=$post['id']?>"/>

    <label for="title">Title</label>
    <input id="title" name="title" value="<?=$post['title']?>" required/>

    
    <label for="description">Description</label>
    <input id="description" name="description" value="<?=$post['description']?>" required/>
    
    <input type="submit" value="Edit"/>
</form>