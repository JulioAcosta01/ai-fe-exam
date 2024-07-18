<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends BaseController
{
    public function index(): JsonResponse
    {
        $users = User::all();
        return $this->sendResponse($users, 'Users retrieved successfully.', 201);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'type' => 'required|in:Writer,Editor',
            'status' => 'required|in:Active,Inactive',
        ]);

        $user = User::create($request->all());

        return  $this->sendResponse($user, 'User created successfully.', 201);
    }

    public function show(User $user): JsonResponse
    {
        return  $this->sendResponse($user, 'User retrieved successfully.', 201);
    }

    public function update(Request $request, User $user): JsonResponse
    {
        $request->validate([
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'type' => 'required|in:Writer,Editor',
            'status' => 'required|in:Active,Inactive',
        ]);

        $user->update($request->all());

        return  $this->sendResponse($user, 'User updated successfully.');
    }

    public function destroy(User $user): JsonResponse
    {
        $user->delete();

        return  $this->sendResponse(null, 'User deleted successfully.', 204);
    }

}
