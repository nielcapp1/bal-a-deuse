<?php
namespace clécodée\componentpreview;

use Craft;
use craft\elements\Entry;
use craft\events\RegisterPreviewTargetsEvent;
use craft\helpers\UrlHelper;
use yii\base\Event;
use yii\helpers\BaseInflector;

class ComponentPreview extends \yii\base\Module
{
    public function init()
    {
        // Define a custom alias named after the namespace
        Craft::setAlias('@clécodée/componentpreview', __DIR__);

        // Set the controllerNamespace based on whether this is a console or web request
        if (Craft::$app->getRequest()->getIsConsoleRequest()) {
            $this->controllerNamespace = 'clécodée\\componentpreview\\console\\controllers';
        } else {
            $this->controllerNamespace = 'clécodée\\componentpreview\\controllers';
        }

        parent::init();

        Event::on(
            Entry::class,
            Entry::EVENT_REGISTER_PREVIEW_TARGETS,
            function (RegisterPreviewTargetsEvent $e) {
                $element = $e->sender;
                $sections = Craft::$app->sections;

                if ($element->uri == null) {
                    $section = $sections->getSectionById($element->sectionId);
                    $type = $sections->getEntryTypeById($element->typeId)->handle;

                    if (!file_exists(Craft::getAlias('@root') . '/templates/_partials/blocks/' . $type . '.twig')) {
                        return;
                    }

                    $e->previewTargets[] = [
                        'label' => Craft::t('app', 'Component preview'),
                        'url' => UrlHelper::siteUrl('/preview', [
                            'elementId' => $element->id,
                            'siteId' => $element->siteId,
                            'type' => $type
                        ]),
                    ];

                    // Don't allow the preview to be accessed publicly
                    Craft::$app->getSession()->authorize('cléCodéePreviewAuthorizationKey'.$element->id);
                }
            }
        );
    }

    protected static function pascalToKebab(string $str): string
    {
        return BaseInflector::camel2id($str);
    }
}
