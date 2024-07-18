<?php

namespace App\Http\Controllers\API;

use App\Models\Company;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CompanyController extends BaseController
{
    public function index(): JsonResponse
    {
        $companies = Company::all();
        return $this->sendResponse($companies, 'Companies retrieved successfully.', 201);
    }

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

    public function show(Company $company): JsonResponse
    {
        return $this->sendResponse($company, 'Company retrieved successfully.', 201);
    }

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

    public function destroy(Company $company): JsonResponse
    {
        $company->delete();

        return $this->sendResponse(null, 'Company deleted successfully.', 204);
    }

}
