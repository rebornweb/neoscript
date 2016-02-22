<!--Include head-->
	<% base_tag %>
	<title><% if $MetaTitle %>$MetaTitle<% else %>$Title<% end_if %> &raquo; $SiteConfig.Title</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	$MetaTags(false)
	<!--[if lt IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<% require themedCSS('reset') %>
	<% require themedCSS('typography') %>
	<% require themedCSS('form') %>
	<% require themedCSS('layout') %>
	<!-- Sass Stylesheets -->
	 <link href="$ThemeDir/stylesheets/screen.css" media="screen, projection" rel="stylesheet" type="text/css" />
<!--link href="$ThemeDir/css/typography.css" media="print" rel="stylesheet" type="text/css" /--> 
	<link rel="shortcut icon" href="$ThemeDir/images/favicon.ico" />