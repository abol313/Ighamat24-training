@extends('layouts.app')

@section('content')
    <p>Service Create</p>

    <form action="{{route('services.update', [$service])}}" method="post">
        @csrf
        @method('put')

        <input name="title" placeholder="title" value={{$service->title}} required/>
        <input name="description" placeholder="description" value={{$service->description}} required/>
        <select name="category_id">
            <option disabled >Category</option>
            @foreach($categories as $category)
                <option value="{{$category->id}}" @selected($service->category_id===$category->id)>{{$category->name}}</option>
            @endforeach
        </select>
        <input name="server_id" type="hidden" value="{{auth('servers')->id()}}"/>
        <input name="unit" placeholder="unit" value={{$service->unit}} required/>
        <input name="price_per_unit" type="number" placeholder="the price per every unit" value={{$service->price_per_unit}} required/>

        <input type="submit" value="edit service" />
    </form>
@endsection
