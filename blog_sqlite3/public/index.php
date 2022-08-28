<?php
require_once("./auto_reload.php");

$page = $_GET["page"] ?? "main.php";

require_once("./header.php");

require_once("./".$page);

require_once("./footer.php");