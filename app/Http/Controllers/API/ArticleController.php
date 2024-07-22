<?php

namespace App\Http\Controllers\API;

use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ArticleController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/articles",
     *     summary="Get all articles",
     *     tags={"Articles"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", type="array",
     *                 @OA\Items(ref="#/components/schemas/Article"),
     *             ),
     *             @OA\Property(property="message", type="string", example="Articles retrieved successfully."),
     *         ),
     *     ),
     * )
     */
    public function index(): JsonResponse
    {
        $articles = Article::
        with('writer')
        ->with('editor')
        ->get();
        return response()->json([
            'success' => true,
            'data' => $articles,
            'message' => 'Articles retrieved successfully.',
        ], 200);
    }

    /**
     * @OA\Post(
     *     path="/api/articles",
     *     summary="Create a new article",
     *     tags={"Articles"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"image","title","link","date","content","status","writer_id","editor_id","company_id"},
     *             @OA\Property(property="image", type="string", format="url", example="https://example.com/image.jpg"),
     *             @OA\Property(property="title", type="string", example="Title"),
     *             @OA\Property(property="link", type="string", format="url", example="https://example.com/article"),
     *             @OA\Property(property="date", type="string", format="date", example="2022-01-01"),
     *             @OA\Property(property="content", type="string", example="Content"),
     *             @OA\Property(property="status", type="string", example="Published"),
     *             @OA\Property(property="writer_id", type="integer", example=1),
     *             @OA\Property(property="editor_id", type="integer", example=1),
     *             @OA\Property(property="company_id", type="integer", example=1),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Article created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", ref="#/components/schemas/Article"),
     *             @OA\Property(property="message", type="string", example="Article created successfully."),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Validation Error."),
     *             @OA\Property(property="errors", type="object", example={"title": {"The title field is required."}}),
     *         ),
     *     ),
     * )
     */
    public function store(Request $request): JsonResponse 
    {
        $request->validate([
            'image' => 'nullable|url',
            'title' => 'required|string',
            'link' => 'required|url',
            'date' => 'required|date',
            'content' => 'required|string',
            'status' => 'required|in:For Edit,Published',
            'writer_id' => 'required|exists:users,id',
            'editor_id' => 'required|exists:users,id',
            'company_id' => 'required|exists:companies,id',
        ]);

        $article = Article::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $article,
            'message' => 'Article created successfully.',
        ], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/articles/{id}",
     *     summary="Get a specific article",
     *     tags={"Articles"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the article",
     *         @OA\Schema(
     *             type="integer",
     *             format="int64",
     *             example=1,
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Article retrieved successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", ref="#/components/schemas/Article"),
     *             @OA\Property(property="message", type="string", example="Article retrieved successfully."),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Article not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Article not found."),
     *         ),
     *     ),
     * )
     */
    public function show(Article $article): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $article,
            'message' => 'Article retrieved successfully.',
        ], 200);
    }

    /**
     * @OA\Put(
     *     path="/api/articles/{id}",
     *     summary="Update a specific article",
     *     tags={"Articles"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the article",
     *         @OA\Schema(
     *             type="integer",
     *             format="int64",
     *             example=1,
     *         ),
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"image","title","link","date","content","status","writer_id","editor_id","company_id"},
     *             @OA\Property(property="image", type="string", format="url", example="https://example.com/image.jpg"),
     *             @OA\Property(property="title", type="string", example="Title"),
     *             @OA\Property(property="link", type="string", format="url", example="https://example.com/article"),
     *             @OA\Property(property="date", type="string", format="date", example="2022-01-01"),
     *             @OA\Property(property="content", type="string", example="Content"),
     *             @OA\Property(property="status", type="string", example="Published"),
     *             @OA\Property(property="writer_id", type="integer", example=1),
     *             @OA\Property(property="editor_id", type="integer", example=1),
     *             @OA\Property(property="company_id", type="integer", example=1),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Article updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", ref="#/components/schemas/Article"),
     *             @OA\Property(property="message", type="string", example="Article updated successfully."),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Validation Error."),
     *             @OA\Property(property="errors", type="object", example={"title": {"The title field is required."}}),
     *         ),
     *     ),
     * )
     */
    public function update(Request $request, Article $article): JsonResponse 
    {
        $request->validate([
            'image' => 'nullable|url',
            'title' => 'required|string',
            'link' => 'required|url',
            'date' => 'required|date',
            'content' => 'required|string',
            'status' => 'required|in:For Edit,Published',
            'writer_id' => 'required|exists:users,id',
            'editor_id' => 'required|exists:users,id',
            'company_id' => 'required|exists:companies,id',
        ]);

        $article->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $article,
            'message' => 'Article updated successfully.',
        ], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/articles/{id}",
     *     summary="Delete a specific article",
     *     tags={"Articles"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the article",
     *         @OA\Schema(
     *             type="integer",
     *             format="int64",
     *             example=1,
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Article deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Article deleted successfully."),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Article not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Article not found."),
     *         ),
     *     ),
     * )
     */
    public function destroy(Article $article): JsonResponse
    {
        $article->delete();

        return response()->json([
            'success' => true,
            'message' => 'Article deleted successfully.',
        ], 200);
    }
}

    
