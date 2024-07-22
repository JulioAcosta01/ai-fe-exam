<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends BaseController
{
    /**
     * @OA\Get(
     *      path="/api/users/profile",
     *      summary="Get the authenticated user",
     *      tags={"Users"},
     *      security={{"bearerAuth":{}}},
     *      @OA\Response(
     *          response=201,
     *          description="Success",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="boolean", example="true"),
     *              @OA\Property(property="data", ref="#/components/schemas/User"),
     *              @OA\Property(property="message", type="string", example="User retrieved successfully."),
     *          ),
     *      ),
     * )
     */
    public function profile(): JsonResponse
    { 
        $user =  auth('sanctum')->user();

        return $this->sendResponse(
            [
                'success' => true,
                'data' => $user,
            ], 
            'User retrieved successfully.',
            201
        );
    }


    /**
     * @OA\Get(
     *     path="/api/users",
     *     summary="Get all users",
     *     tags={"Users"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=201,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/User")),
     *             @OA\Property(property="message", type="string", example="Users retrieved successfully."),
     *         ),
     *     ),
     * )
     */
    public function index(): JsonResponse
    {
        $users = User::all();
        return $this->sendResponse($users, 'Users retrieved successfully.', 201);
    }

    /**
     * @OA\Post(
     *     path="/api/users",
     *     summary="Create a new user",
     *     tags={"Users"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"firstname", "lastname", "type", "status"},
     *             @OA\Property(property="firstname", type="string", example="John", description="First name of the user"),
     *             @OA\Property(property="lastname", type="string", example="Doe", description="Last name of the user"),
     *             @OA\Property(property="type", type="string", example="Writer", description="Type of the user"),
     *             @OA\Property(property="status", type="string", example="Active", description="Status of the user"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="data", ref="#/components/schemas/User"),
     *             @OA\Property(property="message", type="string", example="User created successfully."),
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
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'type' => 'required|in:Writer,Editor',
            'status' => 'required|in:Active,Inactive',
        ]);

        $user = User::create($request->all());

        return $this->sendResponse($user, 'User created successfully.', 201);
    }

    /**
     * @OA\Get(
     *     path="/api/users/{id}",
     *     summary="Get a user",
     *     tags={"Users"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the user",
     *         @OA\Schema(
     *             type="integer",
     *         ),
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="data", ref="#/components/schemas/User"),
     *             @OA\Property(property="message", type="string", example="User retrieved successfully."),
     *         ),
     *     ),
     * )
     */
    public function show(User $user): JsonResponse
    {
        return $this->sendResponse($user, 'User retrieved successfully.', 201);
    }

    /**
     * @OA\Put(
     *     path="/api/users/{id}",
     *     summary="Update a user",
     *     tags={"Users"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the user",
     *         @OA\Schema(
     *             type="integer",
     *         ),
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"firstname", "lastname", "type", "status"},
     *             @OA\Property(property="firstname", type="string", example="John", description="First name of the user"),
     *             @OA\Property(property="lastname", type="string", example="Doe", description="Last name of the user"),
     *             @OA\Property(property="type", type="string", example="Writer", description="Type of the user"),
     *             @OA\Property(property="status", type="string", example="Active", description="Status of the user"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="data", ref="#/components/schemas/User"),
     *             @OA\Property(property="message", type="string", example="User updated successfully."),
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
    public function update(Request $request, User $user): JsonResponse
    {
        $request->validate([
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'type' => 'required|in:Writer,Editor',
            'status' => 'required|in:Active,Inactive',
        ]);

        $user->update($request->all());

        return $this->sendResponse($user, 'User updated successfully.');
    }

    /**
     * @OA\Delete(
     *     path="/api/users/{id}",
     *     summary="Delete a user",
     *     tags={"Users"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the user",
     *         @OA\Schema(
     *             type="integer",
     *         ),
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="data", type="object", example=""),
     *             @OA\Property(property="message", type="string", example="User deleted successfully."),
     *         ),
     *     ),
     * )
     */
    public function destroy(User $user): JsonResponse
    {
        $user->delete();

        return $this->sendResponse(null, 'User deleted successfully.', 204);
    }
}
