<?php
    if($_POST){
        $to = 'info@marbellavein.com';
        $subject = 'Message from Marbellavein Webform';
        $from_name = $_POST['name'];
        $from_email = $_POST['email'];
        $from_phone = $_POST['phone'];
        $message = $_POST['message'];
        $robotest = $_POST['your_id'];
        if($robotest)
            $error = "You are a gutless robot.";
        else{
            if($from_name && $from_email){
                $header = "From: $from_name <$from_email>";
				$fields = array();
				$fields{"name"} = "Name";
				$fields{"email"} = "E-Mail";
				$fields{"phone"} = "Call Back";
				$fields{"message"} = "Message"; 

$body = ""; foreach($fields as $a => $b){ $body .= sprintf("%20s: %s\n",$b,$_REQUEST[$a]); }
 
                if(mail($to, $subject, $body, $header))
                    $success = header( "Location: http://www.marbellavein.com/kontakt/gracias.php" );
                else
                    $error = "You are human but there was a problem sending the e-mail.";
            }else
                $error = "Please, NAME and EMAIL are required.";
        }
        if($error)
            echo '<div class="msg error">'.$error.'</div>';
        elseif($success)
            echo '<div class="msg success">'.$success.'</div>';
    }
?>
