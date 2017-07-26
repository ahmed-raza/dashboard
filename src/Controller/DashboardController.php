<?php

namespace Drupal\dashboard\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use \Drupal\Core\Link;

class DashboardController extends ControllerBase {
  public function index() {
    return [
      '#theme' => 'dashboard',
      '#test_var' => $this->t('Test Value'),
    ];
  }
}
