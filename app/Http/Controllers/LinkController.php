<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\MaritalStatus;
use Illuminate\Http\Request;

class LinkController extends Controller
{
    //

    public function country()
    {
        $countries = Country::all()->map(function ($country) {
            return [
                'value' => $country->id,
                'label' => $country->name,
            ];
        });

        return response()->json($countries);
    }
    public function marital_status()
    {
        $model = MaritalStatus::all()->map(function ($values) {
            return [
                'value' => $values->id,
                'label' => $values->name,
            ];
        });

        return response()->json($model);
    }
}
