<?php

namespace App\Http\Controllers\API;

use App\Models\Company;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CompanyController extends BaseController
{
    /**
     * @OA\Get(
     *     path="/api/companies",
     *     summary="Get all companies",
     *     tags={"Companies"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=201,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/Company")),
     *             @OA\Property(property="message", type="string", example="Companies retrieved successfully."),
     *         ),
     *     ),
     * )
     */
    public function index(): JsonResponse
    {
        $companies = Company::orderBy('created_at', 'desc')
            ->get();
        return $this->sendResponse($companies, 'Companies retrieved successfully.', 201);
    }

    /**
     * @OA\Post(
     *     path="/api/companies",
     *     summary="Create a new company",
     *     tags={"Companies"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"logo","name","status"},
     *             @OA\Property(property="logo", type="string", format="url", example="https://example.com/logo.jpg", description="Logo of the company"),
     *             @OA\Property(property="name", type="string", example="Company", description="Name of the company"),
     *             @OA\Property(property="status", type="string", example="Active", description="Status of the company"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="data", ref="#/components/schemas/Company"),
     *             @OA\Property(property="message", type="string", example="Company created successfully."),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example="false"),
     *             @OA\Property(property="message", type="string", example="Validation Error."),
     *             @OA\Property(property="data", type="object", example="Validation Error."),
     *         ),
     *     ),
     * )
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'logo' => 'nullable|url',
            'name' => 'required|string',
            'status' => 'required|in:Active,Inactive',
        ]);

        $company = Company::create($request->all());

        return $this->sendResponse($company, 'Company created successfully.', 201);
    }

    /**
     * @OA\Get(
     *     path="/api/companies/{id}",
     *     summary="Get a company",
     *     tags={"Companies"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the company",
     *         @OA\Schema(
     *             type="integer",
     *         ),
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="data", ref="#/components/schemas/Company"),
     *             @OA\Property(property="message", type="string", example="Company retrieved successfully."),
     *         ),
     *     ),
     * )
     */
    public function show(Company $company): JsonResponse
    {
        return $this->sendResponse($company, 'Company retrieved successfully.', 201);
    }

    /**
     * @OA\Put(
     *     path="/api/companies/{id}",
     *     summary="Update a company",
     *     tags={"Companies"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the company",
     *         @OA\Schema(
     *             type="integer",
     *         ),
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"logo","name","status"},
     *             @OA\Property(property="logo", type="string", format="url", example="https://example.com/logo.jpg", description="Logo of the company"),
     *             @OA\Property(property="name", type="string", example="Company", description="Name of the company"),
     *             @OA\Property(property="status", type="string", example="Active", description="Status of the company"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="data", ref="#/components/schemas/Company"),
     *             @OA\Property(property="message", type="string", example="Company updated successfully."),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example="false"),
     *             @OA\Property(property="message", type="string", example="Validation Error."),
     *             @OA\Property(property="data", type="object", example="Validation Error."),
     *         ),
     *     ),
     * )
     */
    public function update(Request $request, Company $company): JsonResponse
    {
        $request->validate([
            'logo' => 'nullable|url',
            'name' => 'required|string',
            'status' => 'required|in:Active,Inactive',
        ]);

        $company->update($request->all());

        return $this->sendResponse($company, 'Company updated successfully.');
    }

    /**
     * @OA\Delete(
     *     path="/api/companies/{id}",
     *     summary="Delete a company",
     *     tags={"Companies"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the company",
     *         @OA\Schema(
     *             type="integer",
     *         ),
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Company deleted successfully."),
     *         ),
     *     ),
     * )
     */
    public function destroy(Company $company): JsonResponse
    {
        $company->delete();

        return $this->sendResponse(null, 'Company deleted successfully.', 204);
    }
}
