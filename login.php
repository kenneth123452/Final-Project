<!-- login.php -->

<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Replace the following with your actual authentication logic
    $validUser = ($_POST['username'] == 'admin' && $_POST['password'] == 'admin');

    if ($validUser) {
        $_SESSION['username'] = $_POST['username'];
        header("Location: dashboard.php");
        exit();
    } else {
        header("Location: index.html?error=1");
        exit();
    }
}
?>
