<?php
    if($_POST['name']){
        echo "OK";
    } elseif ( ctype_digit($_POST['order'])) {
        echo "OK2";
    }
?>
