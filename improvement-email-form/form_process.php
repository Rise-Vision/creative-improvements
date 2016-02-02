<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PHP Form</title>
</head>
<body>
  <?php
    $email = $_POST['_replyto'];
    $message = $_POST['jobdetails'];

    $to = 'peter@cameroncodes.com';
    $subject = 'Job Details';

    mail ($to, $subject, $email, $message);

  ?>

</body>
</html>