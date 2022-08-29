<form action="<?=route('admin.posts.store')?>">

    <label for="title">Title</label>
    <input id="title" name="title" required/>

    
    <label for="description">Description</label>
    <input id="description" name="description" required/>
    
    <input type="submit" value="Create"/>
</form>