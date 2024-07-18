<?php
   
namespace App\Http\Controllers\API;
   
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;  
use Illuminate\Support\Facades\Validator;
/**
    * @OA\Post(
    *     path="/register",
    *     summary="Register a new user",
    *     tags={"Auth"},
    *     @OA\RequestBody(
    *         required=true,
    *         @OA\JsonContent(
    *             required={"name","email","password","c_password"},
    *             @OA\Property(property="name", type="string", format="name", example="John Doe", description="Name of the user"),
    *             @OA\Property(property="email", type="string", format="email", example="email", description="Email of the user"),
    *             @OA\Property(property="password", type="string", format="password", example="password", description="Password of the user"),
    *             @OA\Property(property="c_password", type="string", format="password", example="password", description="Password confirmation of the user"),
    *         ),
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Success",
    *         @OA\JsonContent(
    *             @OA\Property(property="success", type="boolean", example="true"),
    *             @OA\Property(property="data", type="object",
    *                 @OA\Property(property="token", type="string", example="token"),
    *                 @OA\Property(property="name", type="string", example="John Doe"),
    *             ),
    *             @OA\Property(property="message", type="string", example="User register successfully."),
    *         ),
    *     ),
    *     @OA\Response(
    *         response=422,
    *         description="Validation Error",
    *         @OA\JsonContent(
    *             @OA\Property(property="success", type="boolean", example="false"),
    *             @OA\Property(property="message", type="string", example="Validation Error."),
    *             @OA\Property(property="data", type="object",
    *                 @OA\Property(property="name", type="array", @OA\Items(type="string", example="The name field is required.")),
    *                 @OA\Property(property="email", type="array", @OA\Items(type="string", example="The email field is required.")),
    *                 @OA\Property(property="password", type="array", @OA\Items(type="string", example="The password field is required.")),
    *                 @OA\Property(property="c_password", type="array", @OA\Items(type="string", example="The c password field is required.")),
    *             ),
    *         ),
    *     ),
    * ),
    * @OA\Post(
    *     path="/login",
    *     summary="Login a user",
    *     tags={"Auth"},
    *     @OA\RequestBody(
    *         required=true,
    *         @OA\JsonContent(
    *             required={"email","password"},
    *             @OA\Property(property="email", type="string", format="email", example="email", description="Email of the user"),
    *             @OA\Property(property="password", type="string", format="password", example="password", description="Password of the user"),
    *         ),
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Success",
    *         @OA\JsonContent(
    *             @OA\Property(property="success", type="boolean", example="true"),
    *             @OA\Property(property="data", type="object", example=""),
    *             @OA\Property(property="message", type="string", example="User login successfully."),
    *         ),
    *     ),
    *     @OA\Response(
    *         response=401,
    *         description="Unauthorised",
    *         @OA\JsonContent(
    *             @OA\Property(property="success", type="boolean", example="false"),
    *             @OA\Property(property="message", type="string", example="Unauthorised."),
    *             @OA\Property(property="error", type="string", example="Unauthorised"),
    *         ),
    *     ),
    * ),
*/
class AuthController extends Controller
{
    
 
    /**
     * Register api
     *
     * @return \Illuminate\Http\JsonResponse 
     */
    public function register(Request $request): JsonResponse 
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
   
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken('MyApp')->plainTextToken;
        $success['name'] =  $user->name;
   
        return $this->sendResponse($success, 'User register successfully.');
    }
   
    /**
     * Login api
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){ 
            $user = Auth::user(); 
            $success['token'] =  $user->createToken('MyApp')->plainTextToken; 
            $success['name'] =  $user->name;
   
            return $this->sendResponse($success, 'User login successfully.');
        } 
        else{ 
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
        } 
    }
}
