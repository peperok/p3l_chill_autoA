<?php

require_once 'vendor/autoload.php';

use Illuminate\Database\Capsule\Manager as Capsule;

// Initialize database connection
$capsule = new Capsule;
$capsule->addConnection([
    'driver' => 'sqlite',
    'database' => __DIR__ . '/database/database.sqlite',
]);
$capsule->setAsGlobal();
$capsule->bootEloquent();

$pdo = $capsule->getConnection()->getPdo();

echo "-- ReuseMart Database SQL Dump for MySQL\n";
echo "-- Generated on " . date('Y-m-d H:i:s') . "\n\n";

echo "SET FOREIGN_KEY_CHECKS = 0;\n\n";

// Get all tables
$tables = $pdo->query("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")->fetchAll(PDO::FETCH_COLUMN);

foreach ($tables as $table) {
    echo "-- Table: $table\n";
    
    // Get table schema
    $schema = $pdo->query("PRAGMA table_info($table)")->fetchAll(PDO::FETCH_ASSOC);
    
    echo "DROP TABLE IF EXISTS `$table`;\n";
    echo "CREATE TABLE `$table` (\n";
    
    $columns = [];
    foreach ($schema as $column) {
        $type = $column['type'];
        // Convert SQLite types to MySQL types
        $type = str_replace('INTEGER', 'INT', $type);
        $type = str_replace('TEXT', 'TEXT', $type);
        $type = str_replace('REAL', 'DECIMAL(10,2)', $type);
        $type = str_replace('BLOB', 'LONGBLOB', $type);
        
        $nullable = $column['notnull'] ? 'NOT NULL' : 'NULL';
        $default = $column['dflt_value'] ? "DEFAULT " . $column['dflt_value'] : '';
        $primary = $column['pk'] ? 'PRIMARY KEY AUTO_INCREMENT' : '';
        
        $columns[] = "  `{$column['name']}` $type $nullable $default $primary";
    }
    
    echo implode(",\n", $columns) . "\n";
    echo ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n";
    
    // Get table data
    $data = $pdo->query("SELECT * FROM $table")->fetchAll(PDO::FETCH_ASSOC);
    
    if (!empty($data)) {
        echo "INSERT INTO `$table` VALUES\n";
        $rows = [];
        foreach ($data as $row) {
            $values = array_map(function($value) {
                return $value === null ? 'NULL' : "'" . addslashes($value) . "'";
            }, array_values($row));
            $rows[] = "(" . implode(', ', $values) . ")";
        }
        echo implode(",\n", $rows) . ";\n\n";
    }
}

echo "SET FOREIGN_KEY_CHECKS = 1;\n";