<?php
session_start();

if (!isset($_SESSION['username'])) {
    header("Location: index.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Dashboard</title>
    <link rel="stylesheet" href="styless.css">
</head>
<body>
    <div class="banner">
        <div class="navbar">
            <img src="src/img/WiseBudgeLogo.png" class="logo">
            <ul>
                <li><a href="Allowance.html">Allowance</a></li>
                <li><a href="Expenses.html">Expenses</a></li>
                <li><a href="Goal.html">Goal</a></li>
                <li><a href="Daily.html">Daily</a></li>
            </ul>
        </div>
        <div class="Budgeting">
            <h1>Budgeting Financial Management</h1>
        </div>
        <div class="content">
            <p>Welcome, <?php echo $_SESSION['username']; ?>!</p>
        </div>
        <div class="pees">
            <p>Plan.</p>
            <p>Budget.</p>
            <p>Save.</p>
        </div>
    </div>
    <footer>
        <p class="footer">"2023 WiseBudge. All rights reserved."</p>
    </footer>
</body>
</html>
