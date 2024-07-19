<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * @OA\Schema(
 *   schema="User",
 *   type="object",
 *   title="User",
 *   description="User model",
 *   required={"firstname","lastname","type","status","email","password"},
 *   @OA\Property(property="id", type="integer", example="1"),
 *   @OA\Property(property="firstname", type="string", example="firstname"),
 *   @OA\Property(property="lastname", type="string", example="lastname"),
 *   @OA\Property(property="type", type="string", example="type"),
 *   @OA\Property(property="status", type="string", example="status"),
 *   @OA\Property(property="email", type="string", format="email", example="email"),
 *   @OA\Property(property="email_verified_at", type="string", format="date-time", example="2021-09-01T00:00:00.000000Z"),
 *   @OA\Property(property="password", type="string", format="password", example="password"),
 *   @OA\Property(property="remember_token", type="string", example="token"),
 *   @OA\Property(property="created_at", type="string", format="date-time", example="2021-09-01T00:00:00.000000Z"),
 *   @OA\Property(property="updated_at", type="string", format="date-time", example="2021-09-01T00:00:00.000000Z"),
 * ) 
 */

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'type',
        'status',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    public function writtenArticles()
    {
        return $this->hasMany(Article::class, 'writer_id');
    }

    public function editedArticles()
    {
        return $this->hasMany(Article::class, 'editor_id');
    }
}
