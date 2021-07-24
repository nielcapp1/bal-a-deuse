<?php
namespace clécodée\base;

use Craft;
use craft\web\View;
use yii\base\Event;

class CléCodée extends \yii\base\Module
{
    public function init()
    {
        // Set a @modules alias pointed to the modules/ directory
        Craft::setAlias('@clécodée/base', __DIR__);

        // Set the controllerNamespace based on whether this is a console or web request
        if (Craft::$app->getRequest()->getIsConsoleRequest()) {
            $this->controllerNamespace = 'clécodée\\base\\console\\controllers';
        } else {
            $this->controllerNamespace = 'clécodée\\base\\controllers';
        }

        parent::init();

        if (Craft::$app->request->getIsSiteRequest()) {
            // Add in our Twig extension
            $extension = new MyTwigExtension();
            Craft::$app->view->registerTwigExtension($extension);
        }
    }
}

class MyTwigExtension extends \Twig\Extension\AbstractExtension
{
    public function getFunctions()
    {
        return [
            new \Twig\TwigFunction('ratio', function($a, $b) {
                $gcd = function($a, $b) use (&$gcd) {
                    return ($a % $b) ? $gcd($b, $a % $b) : $b;
                };
                $g = $gcd($a, $b);
                return $a/$g . ':' . $b/$g;
            }),

            new \Twig\TwigFunction('dimensions', function($asset, $options) {
                $aRatio = explode(':', $options['ratio']) ?? null;
                $dimensions = [];

                if ($options['width'] && $options['height']) {
                    $dimensions = array(
                        'height' => $options['height'],
                        'width' => $options['width']
                    );
                } elseif ($options['width'] && !$options['height']) {
                    if ($options['ratio']) {
                        $dimensions = array(
                            'height' => $options['width'] / $aRatio[0] * $aRatio[1],
                            'width' => $options['width']
                        );
                    } else {
                        $dimensions = array(
                            'height' => 'auto',
                            'width' => $options['width']
                        );
                    }
                } elseif (!$options['width'] && $options['height']) {
                    if ($options['ratio']) {
                        $dimensions = array(
                            'height' => $options['height'],
                            'width' => $options['height'] / $aRatio[1] * $aRatio[0]
                        );
                    } else {
                        $dimensions = array(
                            'height' => $options['height'],
                            'width' => 'auto'
                        );
                    }
                } else {
                    $dimensions = array(
                        'height' => $asset->getHeight(),
                        'width' => $asset->getWidth()
                    );
                }

                return $dimensions;
            }),

            new \Twig\TwigFunction('base64Pixel', function($width = 1, $height = 1, $color = 'transparent') {
                return 'data:image/svg+xml;charset=utf-8,'.rawurlencode("<svg xmlns='http://www.w3.org/2000/svg' width='$width' height='$height' style='background:$color'/>");
            }),

            new \Twig\TwigFunction('stripscript', function($html) {
                return preg_replace('#<script(.*?)>(.*?)</script>#is', '', $html);
            })
        ];
    }
}
