<?php

namespace App\Policies;

use App\Models\InstallmentCondition;
use App\Models\Server;
use App\Models\Service;
use Illuminate\Auth\Access\HandlesAuthorization;

class InstallmentConditionPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\Server  $server
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(?Server $server)
    {
        //
        return true;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\Server  $server
     * @param  \App\Models\InstallmentCondition  $installmentCondition
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(?Server $server, InstallmentCondition $installmentCondition)
    {
        //
        return true;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\Server  $server
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(Server $server)
    {
        //
        return true;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\Server  $server
     * @param  \App\Models\InstallmentCondition  $installmentCondition
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(Server $server, InstallmentCondition $installmentCondition, Service $service)
    {
        //
        // dd($server);
        return $server->id === $service->server_id && $service->id === $installmentCondition->service_id;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\Server  $server
     * @param  \App\Models\InstallmentCondition  $installmentCondition
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(Server $server, InstallmentCondition $installmentCondition, Service $service)
    {
        //
        return $server->id === $service->server_id && $service->id === $installmentCondition->service_id;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\Server  $server
     * @param  \App\Models\InstallmentCondition  $installmentCondition
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(Server $server, InstallmentCondition $installmentCondition)
    {
        //
        
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\Server  $server
     * @param  \App\Models\InstallmentCondition  $installmentCondition
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(Server $server, InstallmentCondition $installmentCondition)
    {
        //
    }
}
