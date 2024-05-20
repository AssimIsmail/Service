<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('image')->nullable(); 
            $table->text('description')->nullable(); 
            $table->timestamps();
        });
        DB::table('categories')->insert([
            ['name' => 'Frontend Development', 'image' => 'https://i.ytimg.com/vi/7C4dv8vuwEk/maxresdefault.jpg', 'description' => 'Articles and tutorials related to frontend technologies like HTML, CSS, JavaScript, and frameworks like React, Angular, Vue.js, etc.'],
            ['name' => 'Backend Development', 'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtVB5P13vzbZoNmO0RQL3NUpL-1IIe4-G5VTy0NU6NLg&s', 'description' => 'Articles and tutorials related to backend technologies like Node.js, Python, PHP, databases, APIs, etc.'],
            ['name' => 'Full Stack Development', 'image' => 'https://cdn.educba.com/academy/wp-content/uploads/2019/11/full-stack-web-developer.png', 'description' => 'Articles and tutorials covering both frontend and backend development, providing a holistic view of web development.'],
            ['name' => 'Mobile App Development', 'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxjBNEHAF4UETi5F-J_Jd6h8QMmE3x-6USiQ&s', 'description' => 'Articles and tutorials related to mobile app development for platforms like Android and iOS, using technologies like React Native, Flutter, Swift, Kotlin, etc.'],
            ['name' => 'DevOps', 'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU37yrOgxecdEs3gkB7yTUAs_rXwcC0iE2kA&s', 'description' => 'Articles and tutorials related to DevOps practices, including continuous integration, continuous deployment, infrastructure as code, containerization, etc.'],
            ['name' => 'Cloud Computing', 'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShpx21Exd7LWs4ek8G0_B2uD1N7dvkNPJVUT0J-tsnAw&s', 'description' => 'Articles and tutorials related to cloud computing platforms like AWS, Azure, Google Cloud, covering topics like cloud infrastructure, serverless computing, containers, etc.'],
            ['name' => 'Cybersecurity', 'image' => 'https://cdn.elearningindustry.com/wp-content/uploads/2022/12/shutterstock_2037142181.jpg', 'description' => 'Articles and tutorials focusing on cybersecurity topics such as data protection, network security, ethical hacking, cryptography, etc.'],
            ['name' => 'Machine Learning', 'image' => 'https://www.fsm.ac.in/blog/wp-content/uploads/2022/08/ml-e1610553826718.jpg', 'description' => 'Articles and tutorials covering machine learning concepts, algorithms, frameworks like TensorFlow, scikit-learn, applications in various domains, etc.'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
