<?php

namespace App\Http\Controllers;

use App\Models\Server;
use App\Models\Service;
use App\Models\ServiceCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ServiceController extends Controller
{

  

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return view('services.index', ['services'=>Service::all()]);
    }

    /**
     * Display a listing of the resource of now authenticated server.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexMyServices()
    {
        //
        if(! $server = auth('servers')->user() )
            abort(403);

        return view('services.index', ['services'=>Service::where('server_id', $server->id)]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        if(!( auth('servers')->user() && auth('servers')->user()->can('create', Service::class) ))
            abort(403);
        
        return view('services.create', ['categories'=>ServiceCategory::all()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(!( auth('servers')->user() && auth('servers')->user()->can('create', Service::class) ))
            abort(403);

        //
        Service::create(
            $request->only([
                'title',
                'description',
                'category_id',
                'server_id',
                'unit',
                'price_per_unit',
            ])
        );

        return back();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function show(Service $service)
    {
        //
        return view('services.show', ['service'=>$service]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function edit(Service $service)
    {
        if(!( auth('servers')->user() && auth('servers')->user()->can('update', $service) ))
            abort(403);

        //
        return view('services.edit', ['service'=>$service, 'categories'=>ServiceCategory::all()]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Service $service)
    {
        if(!( auth('servers')->user() && auth('servers')->user()->can('update', $service) ))
            abort(403);


        //
        $service->fill(
            $request->only([
                'title',
                'description',
                'category_id',
                'server_id',
                'unit',
                'price_per_unit',
            ])
        );

        $service->save();

        return back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function destroy(Service $service)
    {
        if(!( auth('servers')->user() && auth('servers')->user()->can('delete', $service) ))
            abort(403);

        $service->delete();
        return back();

        //
    }
}
