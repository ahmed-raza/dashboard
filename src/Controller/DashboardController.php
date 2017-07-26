<?php

namespace Drupal\dashboard\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use \Drupal\Core\Link;

class DashboardController extends ControllerBase {
  public function index() {
    $build = [
      '#type'   => 'markup',
      '#markup' => t('Hello world!')
    ];
    return $build;
  }
}