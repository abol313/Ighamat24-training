@extends('layouts.app')

@section('content')
    <p>Service Create</p>

    <form action="{{route('services.store')}}" method="post">
        @csrf
        
        <input name="title" placeholder="title" required/>
        <input name="description" placeholder="description" required/>
        <select name="category_id">
            <option selected disabled >Category</option>
            @foreach($categories as $category)
                <option value="{{$category->id}}">{{$category->name}}</option>
            @endforeach
        </select>
        <input name="server_id" type="hidden" value="{{auth('servers')->id()}}"/>
        <input name="unit" placeholder="unit" required/>
        <input name="price_per_unit" type="number" placeholder="" required/>

        <input type="submit" value="create" />
    </form>
@endsection
