<?php
/**
 * Site URL Rules
 *
 * You can define custom site URL rules here, which Craft will check in addition
 * to any routes you’ve defined in Settings → Routes.
 *
 * See http://www.yiiframework.com/doc-2.0/guide-runtime-routing.html for more
 * info about URL rules.
 *
 * In addition to Yii’s supported syntaxes, Craft supports a shortcut syntax for
 * defining template routes:
 *
 *     'blog/archive/<year:\d{4}>' => ['template' => 'blog/_archive'],
 *
 * That example would match URIs such as `/blog/archive/2012`, and pass the
 * request along to the `blog/_archive` template, providing it a `year` variable
 * set to the value `2012`.
 */

$routes = array(
    // Preview
    'preview' => ['template' => '_partials/preview'],

    // GraphQL
    'api' => 'graphql/api',
);

$localRoutes = array(

    // Errors
    'error-400' => ['template' => '_views/errors/400'],
    'error-403' => ['template' => '_views/errors/403'],
    'error-404' => ['template' => '_views/errors/404'],
    'error-500' => ['template' => '_views/errors/500'],
    'error-503' => ['template' => '_views/errors/503'],

    // Email
    'email' => ['template' => '_extras/emails/default'],
);

if (strpos(CRAFT_ENVIRONMENT, 'dev') !== false) {
    $routes = array_merge($routes, $localRoutes);
} else {
    $routes = array_merge($routes);
}

return $routes;
