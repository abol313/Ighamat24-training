<?php

namespace App\Http\Controllers;

use App\Models\Installment;
use App\Models\InstallmentCondition;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceInstallmentConditionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \App\Models\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function index(Service $service)
    {
        //
        return view('services.installment-conditions.index', [
            'service' => $service, 
            'installmentConditions' => $service->installmentConditions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param  \App\Models\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function create(Service $service)
    {
        //
        if(! auth('servers')->user()?->can('create', InstallmentCondition::class))
            abort(403);

        return view('services.installment-conditions.create', ['service'=>$service]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Service $service)
    {
        if(! auth('servers')->user()?->can('create', InstallmentCondition::class))
            abort(403);

        InstallmentCondition::create([
            'maximum' => $request->input('maximum'),
            'installments_count' => $request->input('installments_count'),
            'service_id' => $service->id,
        ]);

        return back();
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Service  $service
     * @param  \App\Models\InstallmentCondition  $installmentCondition
     * @return \Illuminate\Http\Response
     */
    public function show(Service $service, InstallmentCondition $installmentCondition)
    {
        //
        return view('services.installment-conditions.show', ['service'=>$service, 'installmentCondition'=>$installmentCondition]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Service  $service
     * @param  \App\Models\InstallmentCondition  $installmentCondition
     * @return \Illuminate\Http\Response
     */
    public function edit(Service $service, InstallmentCondition $installmentCondition)
    {
        //
        if(! auth('servers')->user()?->can('update', [$installmentCondition, $service]))
            abort(403);

        return view('services.installment-conditions.edit', ['service'=>$service, 'installmentCondition'=>$installmentCondition]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Service  $service
     * @param  \App\Models\InstallmentCondition  $installmentCondition
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Service $service, InstallmentCondition $installmentCondition)
    {
        //
        if(! auth('servers')->user()?->can('update', [$installmentCondition, $service]))
            abort(403);

        $installmentCondition->fill([
            'maximum' => $request->input('maximum'),
            'installments_count' => $request->input('installments_count'),
        ]);

        $installmentCondition->save();

        return back();
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Service  $service
     * @param  \App\Models\InstallmentCondition  $installmentCondition
     * @return \Illuminate\Http\Response
     */
    public function destroy(Service $service, InstallmentCondition $installmentCondition)
    {
        //
        if(! auth('servers')->user()?->can('delete', [$installmentCondition, $service]))
            abort(403);
        $installmentCondition->delete();
        return back();
    }
}
