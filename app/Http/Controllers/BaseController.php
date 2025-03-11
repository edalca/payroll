<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\Model;

class BaseController extends Controller
{
    /**
     * El modelo asociado al controlador.
     * Este valor debe ser sobrescrito por los controladores hijos.
     */
    protected $model;

    /**
     * Display a filtered list of resources as JSON with optional counter and pagination.
     */
    public function data(Request $request): JsonResponse
    {
        if (!isset($this->model) || !class_exists($this->model)) {
            return response()->json(['error' => 'El modelo no está definido en el controlador.'], 500);
        }

        // Obtenemos los parámetros desde la solicitud
        $filters = $request->input('filters', []); // Condiciones AND
        $orFilters = $request->input('orFilters', []); // Condiciones OR
        $attributes = $request->input('attributes', []); // Atributos solicitados
        $relations = $request->input('relations', []); // Relaciones solicitadas
        $counter = $request->boolean('counter', false); // Contador, por defecto false
        $pagination = $request->boolean('pagination', false); // Paginación, por defecto false
        $perPage = $request->input('per_page', 10); // Solo usado si pagination es true
        $page = $request->input('page', 1); // Solo usado si pagination es true

        // Iniciamos la consulta con el modelo especificado
        $query = $this->model::query();

        // Obtenemos las columnas disponibles del modelo
        $availableAttributes = \Schema::getColumnListing((new $this->model)->getTable());

        // Siempre incluimos 'id' por defecto
        $selectAttributes = ['id'];

        // Si se especifican atributos, los validamos y los añadimos
        if (!empty($attributes)) {
            foreach ($attributes as $attribute) {
                if (in_array($attribute, $availableAttributes) && $attribute !== 'id') {
                    $selectAttributes[] = $attribute;
                }
            }
        } else {
            // Si no se especifican atributos, seleccionamos todos
            $selectAttributes = $availableAttributes;
        }

        // Seleccionamos los atributos especificados
        $query->select($selectAttributes);

        // Manejo de relaciones
        if (!empty($relations)) {
            foreach ($relations as $relation) {
                $relationName = $relation['name'] ?? null;
                $relationAttributes = $relation['attributes'] ?? [];

                if ($relationName && method_exists($this->model, $relationName)) {
                    $query->with([
                        $relationName => function ($query) use ($relationAttributes) {
                            if (!empty($relationAttributes)) {
                                $query->select(array_merge(['id'], $relationAttributes));
                            }
                        }
                    ]);
                }
            }
        }

        // Aplicamos los filtros con AND
        if (!empty($filters)) {
            $this->applyFilters($query, $filters, 'and');
        }

        // Aplicamos los filtros con OR (usando where con closure)
        if (!empty($orFilters)) {
            $query->where(function ($q) use ($orFilters) {
                $this->applyFilters($q, $orFilters, 'or');
            });
        }

        // Ejecutamos la consulta según si hay paginación o no
        if ($pagination) {
            $resources = $query->paginate($perPage, ['*'], 'page', $page);
            $data = $resources->items();
            $total = $counter ? $resources->total() : null;
        } else {
            $resources = $query->get();
            $data = $resources;
            $total = $counter ? $resources->count() : null;
        }

        // Construimos la respuesta JSON
        $response = ['data' => $data];

        if ($counter) {
            $response['total'] = $total;
        }

        if ($pagination) {
            $response['per_page'] = $resources->perPage();
            $response['current_page'] = $resources->currentPage();
            $response['last_page'] = $resources->lastPage();
        }

        $response['attributes'] = $selectAttributes;

        return response()->json($response);
    }

    /**
     * Aplica filtros a la consulta dinámicamente.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param array $filters
     * @param string $logicalOperator ('and' o 'or')
     */
    protected function applyFilters($query, array $filters, string $logicalOperator = 'and')
    {
        $columns = \Schema::getColumnListing((new $this->model)->getTable());

        foreach ($filters as $filter) {
            if (!isset($filter['field']) || !isset($filter['operator']) || !in_array($filter['field'], $columns)) {
                continue;
            }

            $field = $filter['field'];
            $operator = strtolower($filter['operator']);
            $method = $logicalOperator === 'and' ? 'where' : 'orWhere';

            switch ($operator) {
                case '=':
                case '<>':
                case '<':
                case '>':
                case '<=':
                case '>=':
                    $query->$method($field, $operator, $filter['value']);
                    break;

                case 'like':
                    $pattern = match ($filter['pattern'] ?? 'contains') {
                        'start' => "{$filter['value']}%",
                        'end' => "%{$filter['value']}",
                        'contains' => "%{$filter['value']}%",
                        default => "%{$filter['value']}%",
                    };
                    $query->$method($field, 'LIKE', $pattern);
                    break;

                case 'between':
                    $betweenMethod = $logicalOperator === 'and' ? 'whereBetween' : 'orWhereBetween';
                    $query->$betweenMethod($field, [$filter['startValue'], $filter['endValue']]);
                    break;

                case 'in':
                    $inMethod = $logicalOperator === 'and' ? 'whereIn' : 'orWhereIn';
                    $query->$inMethod($field, $filter['values']);
                    break;

                case 'null':
                    $nullMethod = $logicalOperator === 'and' ? 'whereNull' : 'orWhereNull';
                    if ($filter['condition'] === 'IS NOT NULL') {
                        $nullMethod = $logicalOperator === 'and' ? 'whereNotNull' : 'orWhereNotNull';
                    }
                    $query->$nullMethod($field);
                    break;

                case 'not null':
                    $notNullMethod = $logicalOperator === 'and' ? 'whereNotNull' : 'orWhereNotNull';
                    $query->$notNullMethod($field);
                    break;

                default:
                    break;
            }
        }
    }
}