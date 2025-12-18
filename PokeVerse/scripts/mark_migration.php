<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
\Illuminate\Support\Facades\DB::table('migrations')->insert([
    'migration' => '2025_12_18_000000_create_sessions_table',
    'batch' => 1,
]);
echo "ok\n";
