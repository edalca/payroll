<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AttributeController extends Controller
{
    /**
     * Display a listing of the resources.
     */
    public function index(): Response
    {
        $attributes = Attribute::all(); // O usa paginación: Attribute::paginate(10);
        return Inertia::render('attribute/index', [
            'data' => $attributes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('attribute/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'key' => 'required|string|max:255|unique:attributes,key',
            'type' => 'required|in:value,selection,multiple',
            'options' => 'nullable|json',
            'table_name' => 'required|string|max:255',
            'is_required' => 'boolean',
        ]);

        Attribute::create($validatedData);

        return redirect()->route('attributes.index')->with('success', 'Atributo creado exitosamente.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attribute $attribute): Response
    {
        return Inertia::render('attribute/edit', [
            'attribute' => $attribute,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attribute $attribute)
    {
        $validatedData = $request->validate([
            'key' => 'required|string|max:255|unique:attributes,key,' . $attribute->id,
            'type' => 'required|in:value,selection,multiple',
            'options' => 'nullable|json',
            'table_name' => 'required|string|max:255',
            'is_required' => 'boolean',
        ]);

        $attribute->update($validatedData);

        return redirect()->route('attributes.index')->with('success', 'Atributo actualizado exitosamente.');
    }
}